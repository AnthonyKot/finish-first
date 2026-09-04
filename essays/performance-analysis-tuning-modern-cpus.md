# The Fifth Thread Made the Program Slower

We had just provisioned an eight-core server to crunch daily telemetry logs.

The single-threaded baseline ran in forty-eight seconds. Two threads cut it to twenty-six, and four threads brought it down to fourteen.

Then I passed `--workers=5` into the CLI, hit enter, and watched the runtime jump to twenty-two seconds.

By eight workers, the machine was louder, hotter, and running slower than it had on two cores.

I opened `htop` and saw every core pinned at 100%. The machine was visibly sweating, but our team had just bought hardware that was actively sabotaging itself.

The comfortable explanation was that we had hit a serial wall and run out of parallel work. The reality was much uglier: our threads were spending half their lives fighting over memory they didn't even know they were sharing.

## A cover-to-cover read left nothing behind

I had already read Denis Bakhvalov's *Performance Analysis and Tuning on Modern CPUs* once.

I read it the way engineers are told to read reference books: front to back, highlighting diagrams of superscalar execution pipelines, cache hierarchies, and branch predictors. Three months later, sitting in front of that crawling five-worker benchmark, I retained almost none of it.

A manual full of architectural facts does not stick when you have no crime scene to map it against.

So I picked the book back up, skipped every foundational chapter, and went straight to the final chapter on multithreading.

Starting at the ending changed everything. Read backward from a real bottleneck, hundreds of pages of silicon theory stopped being an academic catalog and turned into a diagnostic weapon.

## A scaling curve is an X-ray, not a scoreboard

When you measure a fixed workload across one, two, four, and eight workers, you are not recording how fast your program is. You are measuring the cost of communication.

A rising curve shows that added workers still contribute useful throughput. A flat plateau means a serial bottleneck now dominates the capacity. A declining curve means the communication overhead is growing faster than the work it enables.

> Adding cores doesn't just split the work; it multiplies the conversations the hardware must conduct to keep memory honest.

The fifth worker in our benchmark didn't just fail to help. It executed more instructions, consumed more core cycles, and created a storm of cache traffic.

This is why raw CPU utilization deceives. A core spinning on a lock burns cycles while appearing fully occupied, but it is not advancing the application by a single byte.

## Separate variables can still be roommates in the cache

The most insidious multithreaded regression is completely invisible in source code.

Imagine two threads updating two separate counters. Neither thread reads the other's state, and no mutex is involved. To the compiler and the developer, the data looks entirely private:

```cpp
struct WorkerStats {
    uint64_t sumA; // Updated exclusively by Thread 1
    uint64_t sumB; // Updated exclusively by Thread 2
};

void workerA(WorkerStats* stats, const uint32_t* data, size_t count) {
    for (size_t i = 0; i < count; ++i) {
        stats->sumA += data[i];
    }
}

void workerB(WorkerStats* stats, const uint32_t* data, size_t count) {
    for (size_t i = 0; i < count; ++i) {
        stats->sumB += data[i];
    }
}
```

There are no locks, no shared pointers, and no data races. It compiles cleanly and passes every static analyzer.

Yet run those functions concurrently on separate cores and throughput collapses.

Hardware does not coordinate memory at the granularity of eight-byte integers. It moves memory in 64-byte cache lines.

Because `sumA` and `sumB` sit adjacent in `WorkerStats`, they inhabit the very same cache line. When Thread 1 writes to `sumA`, its core must acquire exclusive ownership of that 64-byte line, invalidating the copy sitting in Thread 2's cache. A moment later, Thread 2 writes to `sumB` and invalidates Thread 1's cache in return.

The cores spend their cycles playing hot potato with a cache line instead of computing numbers.

That is false sharing. The variables are logical strangers, but physical roommates.

## The obvious fixes target the wrong layer

When a multithreaded job begins to slow down, teams reflexively reach for familiar tools.

They remove mutexes, tweak thread pools, or rewrite inner loops. None of that touches false sharing, because there was never a lock to remove and the math was never slow.

The fight is happening in the physical data layout.

The instinctive response is to pad every struct with sixty-four bytes of empty space or force every field onto its own cache line. That eliminates the bounce, but padding is not a free universal rule.

Padding bloats memory structures, pollutes CPU caches with empty bytes, and burns memory bandwidth. You trade contention for cache eviction.

To resolve multithreaded degradation without guessing, you need an honest diagnostic order:

1. Establish that performance flattens or reverses on a fixed workload as worker counts rise.
2. Distinguish productive execution from waiting, spinning, and scheduler preemption.
3. Gather hardware counter evidence of contended cache lines and connect them back to source structures.
4. Adjust data layout or memory ownership exclusively for the demonstrated conflict.
5. Re-run the full worker sweep across every hardware architecture your system supports.

## The early chapters only matter once you have a crime scene

Reading backward from this cache collision transforms the first half of the book into an investigation kit.

The chapter on data structures suddenly matters because it demonstrates that layout is behavior. It lays out the exact tension you need: separating fields prevents coherence contention, but excessive padding degrades cache and memory-bandwidth efficiency.

The profiling workflow chapter provides the discipline: categorize the stall first, locate the code second, and only then attempt a fix. Bakhvalov's walkthrough of Top-Down Microarchitecture Analysis shows that an aggregate memory-bound signal is a reason to inspect contested accesses, not proof that an arbitrary struct needs rewriting.

The metrics chapters stop feeling like an academic glossary. Concepts like retired versus executed instructions, core cycles, and pipeline slots finally make sense when you need to prove a thread is spinning on a barrier rather than doing useful work.

And the earliest chapters on measurement hygiene deliver the bedrock warning. Frequency scaling, thermal throttling, and background noise can easily masquerade as multithreaded regressions if your benchmark environment is sloppy.

> You don't read a hardware manual to admire the architecture. You read it to discover which layer of abstraction broke its promise.

## Diagnostic categories survive; screenshots do not

Hardware and tools move rapidly.

Specific performance-counter names mutate across CPU generations, and profiler interfaces shift between releases. The tool walkthroughs and screenshots in a reference book are historical examples of evidence, not commands guaranteed to work unchanged on your current kernel.

Even standard Linux facilities like `perf c2c` present different options and limitations across Intel, AMD, and Arm processors.

What remains durable are the underlying diagnostic categories: serial work, load imbalance, synchronization waits, preemption, oversubscription, and cache coherence traffic.

There is also one conceptual claim to leave behind: true sharing does not inherently imply data races. Cores can legitimately share the same memory location through atomics or correct synchronization. True sharing means threads contend over the same logical data; false sharing means distinct data collides at cache-line granularity.

<!--mission-->
## Build a thread-count autopsy before you write another line

This part runs on your hardware, not on the book.

Pick one parallel job, batch worker, or test suite in your codebase whose scaling curve feels disappointing.

Keep the input and machine state identical across every trial. Run five passes each at 1, 2, 4, and your machine's full logical CPU count, recording the median elapsed time for each setting.

Tonight, build a four-row autopsy table:

| Workers | Median Result | Delta vs Previous | Observed Overhead | Leading Explanation |
| :--- | :--- | :--- | :--- | :--- |
| **1** | Baseline | — | — | Baseline execution |
| **2** | ... | ... | ... | ... |
| **4** | ... | ... | ... | ... |
| **Max** | ... | ... | ... | ... |

Under the table, commit to exactly one next diagnostic probe. Do not pad a structure, do not replace a lock, and do not tweak a thread pool.

If your curve bends the wrong way above four workers, run `perf c2c` to inspect cache-line contention. If runtimes stretch while CPU utilization stays low, measure synchronization waits.

Make the curve name the question before you touch the source code.

The evidence lives in “Optimizing Multithreaded Applications.” Read that one next to a profiler, not next to a coffee.
