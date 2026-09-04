# The Fifth Thread Made the Program Slower

A program finishes a fixed job with one worker. Two workers help. Four help more. Then the fifth arrives and the curve bends the wrong way.

The comforting explanation is that the machine has run out of useful parallelism. That may be true, but it is not the only possibility. The new worker may be waiting on a serial phase. It may be spinning while appearing busy. It may be competing for a lock. Or it may update a completely different variable from its neighbors while forcing their cores to exchange ownership of the same cache line.

That last possibility is the late payoff of Denis Bakhvalov's *Performance Analysis and Tuning on Modern CPUs*. Chapter 11 turns “use more cores” from a slogan into a diagnosis: **a thread-count curve measures not only how much work can run in parallel, but how much communication the parallelism creates**. More workers can stop helping and begin adding instructions, waits, scheduling, synchronization, and coherence traffic. The reader's reward is not a magic thread count. It is a way to stop optimizing the wrong thing when scaling flattens or reverses. [Receipt: Chapter 11 introduction and “Performance Scaling And Overhead,” PDF/printed pp. 147–149; chapter summary, pp. 159–160.]

## The idea: a scaling curve is an X-ray

For a fixed workload, measure performance at one worker, then two, then four, and continue toward the machine's logical-CPU count. The shape gives you a question before it gives you an answer.

- A rising curve says added workers still contribute useful throughput.
- A plateau says some limiting factor now dominates the added capacity.
- A declining curve says the added workers impose more cost than useful work.

Chapter 11 begins with the familiar serial limit: if one thread owns the long pole, accelerating a thread that already finishes early cannot shorten the job. Its h264 example then shows something richer. Performance gains largely stop after four threads on a four-core/eight-thread machine, while the runs above four threads execute more instructions and consume more core cycles. The extra workers are not free passengers. They change the work the machine must perform. [Receipt: PDF/printed pp. 147–149, including Figures 46–48 and their discussion.]

This is why a single aggregate such as CPU utilization can deceive. A core can be busy spinning on a lock without advancing the application. Chapter 11 separates effective CPU utilization from spin and parallel-runtime overhead, and it distinguishes synchronization waits from preemption waits. Those categories suggest different investigations: a contended object, too many runnable threads, work units that are too small, or an imbalanced pipeline in which some workers repeatedly arrive early and wait. [Receipt: “Parallel Efficiency Metrics,” PDF/printed pp. 149–150.]

The chapter's profiling walkthrough makes the diagnostic order concrete. First inspect the whole application's thread behavior. Then find where time or waits concentrate. Then connect the expensive event back to a call path or source location. In the book's x264 example, a large share of context switches leads through one conditional-wait path. The point is not that your program has the same function. The point is that “multithreading is slow” becomes a claim you can narrow to a particular kind of lost time and a particular path. [Receipt: VTune and Linux perf walkthroughs, PDF/printed pp. 150–155.]

## The surprise: different variables can still be shared

Near the end of the chapter, the hardware changes what the source code appears to say.

Imagine two threads. One repeatedly updates `sumA`; the other repeatedly updates `sumB`. No thread reads or writes the other's variable. At source level, the state looks private. If both integers occupy the same cache line, however, the coherence system does not transfer ownership of an individual integer. A write requires the containing line to be writable in that core's cache, so the two cores can invalidate and reacquire the line as their independent updates alternate.

That is false sharing: the variables are logically separate, but the unit of hardware coherence makes them physical roommates. The program can slow as more workers join because more execution capacity creates more ownership traffic. Unlike an ordinary serial fraction, this cost can produce retrograde scaling rather than merely a ceiling. [Receipt: “Cache Coherency Protocols” and “False Sharing,” PDF/printed pp. 156–160.]

The diagnosis matters because the obvious fixes target the wrong layer. Removing a lock will not repair a cache-line fight that has no lock. Rewriting the arithmetic will not change where the counters live. Increasing the worker count amplifies the very traffic causing the loss.

The book points to data layout instead. Its earlier memory chapter shows the same two-field structure and then aligns one field so the two writers do not share a line. That can reduce false sharing, but it is not a free universal rule. Padding consumes memory and can reduce cache and bandwidth efficiency. The honest sequence is therefore:

1. establish that scaling flattens or declines on a fixed workload;
2. distinguish useful work from waiting, spinning, and scheduler overhead;
3. gather evidence of contended cache lines and identify the source objects;
4. change the layout or ownership model only for the demonstrated conflict;
5. rerun the scaling sweep on every platform that matters.

[Receipt: alignment, padding costs, and the earlier false-sharing repair, PDF/printed pp. 115–117; later detection and repair discussion, pp. 158–159.]

Current tools preserve this route, although their support depends on the processor and operating system. Upstream `perf c2c` still exists specifically to locate expensive shared cache lines, with different facilities and limitations across Intel, AMD, Arm64, and PowerPC. Intel's current VTune documentation also retains a false-sharing workflow. Treat the local book's 2020 screenshots and event names as examples of evidence, not commands guaranteed to work unchanged on your machine. [Current checks: <https://man7.org/linux/man-pages/man1/perf-c2c.1.html> and <https://www.intel.com/content/www/us/en/docs/vtune-profiler/cookbook/2023-0/false-sharing.html>.]

## Why the earlier chapters suddenly matter

Read backward from the fifth thread and the first half of the book becomes an investigation kit.

Chapter 8 supplies the closest dependency: **layout is behavior**. Its cache-friendly structures, alignment discussion, and padding example explain how two fields that are separate in the language can remain coupled in the cache. It also states the trade-off the late chapter needs: separating fields may prevent contention, but wasted padding can reduce cache and memory-bandwidth efficiency. Without that tension, “align everything” would merely replace one performance superstition with another. [Receipt: “Cache-Friendly Data Structures,” especially alignment and padding, PDF/printed pp. 113–118.]

Chapter 6 supplies the workflow: **identify the bottleneck category, locate the responsible code, then fix it**. Its Top-Down Microarchitecture Analysis section repeatedly moves from a high-level stall category to a source location before recommending a change. Chapter 11 reuses that order for coherence: an aggregate memory-bound signal is a reason to inspect contested accesses, not proof that a particular structure is guilty. [Receipt: “Top-Down Microarchitecture Analysis,” PDF/printed pp. 73–82; false-sharing workflow, pp. 158–159.]

Chapters 3 and 4 supply the vocabulary that makes the evidence legible. The cache hierarchy and performance-monitoring unit explain why the CPU observes events below the source-language abstraction. The metrics chapter explains retired versus executed instructions, utilization, cycles, cache misses, and pipeline slots. Chapter 11's warning about a spinning thread follows directly: a high utilization number reports that a processor was occupied, not that the application was making useful progress. [Receipt: memory hierarchy and PMU, PDF/printed pp. 36–45; terminology and metrics, pp. 46–51; effective utilization and spin time, pp. 149–150.]

Chapter 2 reaches bedrock: **a scaling curve is trustworthy only when its measurements are comparable**. Frequency, temperature, neighboring processes, filesystem state, affinity, and layout can change between runs. The chapter recommends repeated measurements and warns against declaring a winner from one convenient summary. Without that discipline, a noisy fifth run can masquerade as a fifth-thread regression. [Receipt: noise and comparable environments, PDF/printed pp. 18–20; repeated manual measurements, pp. 22–24; microbenchmark hazards, pp. 27–28.]

The backward trail is now visible:

> Chapter 11's cache-line diagnosis depends on Chapter 8's layout trade-offs, Chapter 6's identify-then-locate workflow, Chapters 3–4's hardware metrics, and Chapter 2's repeatable measurements.

The earlier material no longer asks you to memorize a processor diagram. It earns its place by helping you explain a curve that should have risen and did not.

## What has aged—and one claim to correct

This local PDF is the first edition, released in 2020. The author released a substantially expanded second edition in 2024 and makes both editions available free. The newer edition adds a multi-workload thread-count-scaling case study on newer hardware; it is the right continuation after this local reading mission. The author's second-edition material still calls thread-count scaling especially valuable, which is strong evidence that the selected payoff survived the revision. [Current-edition checks: <https://easyperf.net/about_me> and <https://easyperf.net/blog/2024/05/10/Thread-Count-Scaling-Part1>.]

The durable parts are the experiment and the causal categories: serial work, imbalance, waiting, contention, coherence, and oversubscription. The per-CPU event names, tool screens, links, and platform-specific recipes are not durable. Verify them against current documentation for the exact CPU and kernel you are measuring.

There is also one sentence not to carry forward. PDF/printed p. 158 says true sharing implies data races. The example on that page does contain an unsynchronized update, but the general claim is too broad: multiple cores can truly share one location through atomics or correct synchronization. Keep the useful distinction instead. **True sharing means the threads contend over the same logical data; false sharing means distinct logical data collide at cache-line granularity.** Race freedom and coherence cost are different questions. [Receipt: “True Sharing” and “False Sharing,” PDF/printed pp. 158–159.]

## Your one reading mission

Read **Chapter 11 in full, PDF/printed pages 147–160**. Use one real, fixed workload whose worker count you can control. Keep its input and machine conditions unchanged.

Run it five times at each of **1, 2, 4, and all logical CPUs**. Record the median elapsed time or throughput for each setting, plus task-clock/CPU utilization and context switches if your platform exposes them. While reading, carry three questions:

- Where does the scaling curve first stop paying for another worker?
- At that point, is the strongest evidence for serial work, imbalance, waiting/spinning, oversubscription, or cache-line contention?
- What one observation would distinguish your leading explanation from the nearest alternative?

You are finished when you produce a four-row **thread-count autopsy** with columns `workers`, `median result`, `change from previous row`, `observed overhead`, and `leading explanation`. Under it, write exactly one next probe—not a fix—to gather the missing evidence. It might target a contended wait path or an expensive shared cache line, but it must follow from the measurements you recorded.

Do not pad a structure, replace a lock, or change an algorithm during this mission. The payoff is learning to make the curve name the next question. When you can explain why the fifth thread deserves investigation rather than celebration, the rest of the book has a destination: it is the route from “more hardware should have helped” to evidence about what the hardware actually did.
