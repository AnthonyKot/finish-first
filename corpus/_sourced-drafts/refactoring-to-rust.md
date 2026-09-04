# The Migration Unit Is a Seam, Not a Codebase

The most persuasive moment in Lily Mara and Joel Holmes's *Refactoring to Rust*
arrives almost at the end. A small Rust host loads one WebAssembly search module,
then another. One searches papers; the other searches books. Their internals and data
sources differ, but the host does not need to be recompiled. Each module satisfies the
same small interface, so the surrounding program can choose an implementation at
startup (Chapter 10, PDF pp. 282–289).

That demonstration matters less for what it says about search or WebAssembly than
for what it reveals about migration: **you do not migrate a codebase all at once. You
migrate one seam at a time.**

This is the reason to finish the book. The early chapters can look like separate Rust
tours—ownership, FFI, modules, Python extensions, testing, concurrency. From the
last chapter, they line up into one practical method. Find a valuable boundary. State
its contract. Put unsafe or language-specific translation at its edge. Reimplement the
behavior behind it. Run the old and new paths against the same evidence. Then make
the replacement small enough to deploy, observe, and reverse.

## The promise: make a rewrite unnecessary

“Rewrite it in Rust” is an attractive sentence because it erases the awkward middle.
The old system is slow or dangerous; the new one will be fast and safe. But users live
in the middle. So do production incidents, undocumented behavior, release calendars,
and the engineers who must maintain both versions while the transformation is under
way.

Chapter 1 refuses the clean-room fantasy. It contrasts a large replacement with small,
independent changes that can ship while the existing system continues serving users.
It treats the old application's operational history and automated tests as assets, not
debris. It also asks how old and new paths will be compared and how rollout can be
limited (PDF pp. 20–23). Later, it names a four-part loop: planning, implementation,
verification, and deployment (PDF pp. 28–30).

The payoff is control. A well-chosen seam gives you a place where two implementations
can coexist. You can send the same input to each, compare their output, measure their
cost, expose the new path to a small audience, and return to the old one if reality
disagrees with your benchmark. Rust becomes useful here not because every line must
be Rust, but because one bounded component may benefit from Rust's performance,
types, ownership rules, or concurrency while the rest of the application remains
unchanged.

That makes the first migration question surprisingly modest: **what is the smallest
valuable behavior that the existing program could call through an explicit contract?**

## The idea: the boundary is part of the product

In Chapter 10, the host expects search behavior and the modules provide it. That
sounds simple until values must cross the boundary. WebAssembly functions expose a
small set of primitive values; strings and structured data require the host and module
to agree on representation, allocation, and reading. The book moves from calling a
function to confronting linear memory precisely because interchangeability is never
free (PDF pp. 280–281, 289–291).

This is the central engineering idea hiding behind the example: a seam is not merely
the function name. It is a bundle of agreements:

- which inputs are valid and who validates them;
- which outputs and failures are observable;
- which side owns memory and releases resources;
- whether calls may block, retry, or run concurrently;
- how old and new behavior are compared;
- how the system chooses an implementation and retreats from it.

The same problem appears earlier at the C boundary. Rust cannot infer the lifetime or
ownership of memory created elsewhere, so crossing into foreign memory creates proof
obligations for the programmer (PDF pp. 79–80). The book's better design move is to
keep those obligations in a thin adapter: convert the C string, validate it, and pass an
ordinary Rust string reference into a separate `evaluate` function with no FFI or
unsafe concerns (PDF pp. 95–96). The adapter knows the foreign world. The core knows
the business rule.

That separation makes safety local and reuse possible. It also makes review more
honest. “Written in Rust” does not mean “safe” if unchecked assumptions are spread
throughout the component. “Runs in a sandbox” does not mean “trusted” if the host
grants broad capabilities or misreads guest memory. Chapter 10 itself says the virtual
machine bears responsibility for memory interaction and that its design is therefore
important (PDF pp. 289–290). The useful question is not whether the new technology
has a safety label. It is where the unverified assumptions live and how small that area
can become.

## The reverse dependency trail

Start at the destination: two implementations can be swapped behind one host
contract without rebuilding the host (PDF pp. 286–289). To make that demonstration
mean something in production, walk backward through four prerequisites.

First, **define the seam before choosing the Rust mechanism**. Chapter 1 asks what you
hope to improve, which part needs replacement, and how the existing code will talk to
the new code (PDF p. 28). It also supplies a rejection test: frequent deployment must
be practical, and the organization must be able to maintain the Rust it introduces
(PDF p. 28). A hotspot without a stable boundary, measurable pain, or an owner is not
a migration candidate yet.

Second, **separate translation from behavior**. Ownership and borrowing explain who
may access a value and when it is dropped (PDF pp. 34–35). FFI then shows what
happens when the compiler cannot verify those facts across a language boundary (PDF
pp. 79–80). The C example concentrates pointer checks and representation conversion
in the exported wrapper, leaving the calculation in normal Rust (PDF pp. 95–96).
Chapter 10 repeats the lesson at a different boundary: host and guest must agree on
how complex data occupies memory (PDF pp. 289–291). The technologies differ; the
design discipline is the same.

Third, **make the old behavior an oracle**. In the Python example, the book uses the
existing implementation and the Rust replacement on identical randomized inputs,
then asserts equal results (PDF pp. 225–229). This does not prove that the old behavior
is ideal. It makes differences visible before someone accidentally calls them
improvements. Once equivalence is explicit, intentional changes can be reviewed as
changes instead of hiding inside a language migration.

Fourth, **prove the promised benefit on the real boundary**. The Python migration
isolates JSON parsing while leaving I/O in Python (PDF pp. 184–185). It then benchmarks
both paths and discovers that an unoptimized Rust build provides only a modest gain;
the release build changes the result substantially (PDF pp. 195, 203–204). The larger
lesson is not the reported speedup. It is that intuition was insufficient twice: first to
locate the expensive work, then to evaluate the replacement. Measure the old and new
paths under representative conditions, including conversion cost at the seam.

The path through the book is therefore:

**measurable pain → explicit contract → narrow adapter → equivalent behavior →
measured benefit → reversible rollout.**

Rust is one implementation choice inside that chain. The seam is what makes the
choice survivable.

## Why the last chapter is still worth reading in 2026

The architectural lesson survived better than the commands. The book was published
in 2025, yet its final examples use the old `wasm32-wasi` target name and pre–Rust
2024 `#[no_mangle]` syntax (PDF pp. 280–281, 287, 289, 291, 294). Current Rust uses
`wasm32-wasip1` for that compatibility target, and Rust 2024 requires
`#[unsafe(no_mangle)]`. The pinned WasmEdge and ecosystem APIs also need current
documentation before use.

That is not a reason to discard the ending. It is a reason to read it at the right level.
Do not copy the project as a 2026 recipe. Watch the authors progressively discover
the contract: first a binary entry point, then a directly callable function, then a host,
then a second interchangeable module, then the memory agreement that makes richer
values possible. The friction is the lesson. Every convenient cross-language call
rests on choices about representation, capabilities, ownership, and failure.

## One reading mission

Read **PDF pages 282–290** (printed pp. 263–271), from Section 10.4, “Consuming
Wasm,” through the first two pages of Section 10.6, “Wasm memory.” Do not run the
version-pinned commands yet.

Carry three questions:

1. What does the host require from every module, and what does the module assume
   about the host?
2. Which part of the interface is stable behavior, and which part leaks the chosen
   runtime or memory representation?
3. What evidence would justify replacing one implementation, and what switch would
   return traffic to the old one?

Completion evidence: write a one-page **seam card** for one slow, risky, or awkward
component you know. Include exactly six fields: candidate behavior, input/output
contract, ownership boundary, old-behavior oracle, success measure, and rollback
switch. The mission is complete when another engineer could implement a second
version from the card—or point to the ambiguity that prevents it.

## Receipts

- Incremental changes, existing operational knowledge, reused tests, comparison, and
  controlled rollout: Chapter 1, PDF pp. 20–23.
- When not to refactor and the plan/implement/verify/deploy loop: Sections 1.5–1.6,
  PDF pp. 28–30.
- Ownership rules: Section 2.1, PDF pp. 34–35.
- Foreign-memory obligations: Sections 3.1–3.2, PDF pp. 79–80.
- Thin FFI adapter and ordinary reusable Rust core: Section 3.2.3, PDF pp. 95–96.
- Isolating Python JSON parsing and benchmarking both paths: Sections 6.2 and 6.5,
  PDF pp. 184–185 and 195.
- Release-build comparison and six-step migration recap: Section 6.6, PDF pp. 203–204.
- Comparing original Python and Rust behavior on generated inputs: Section 7.2.1,
  PDF pp. 225–229.
- Host/module interface and dynamic module loading: Section 10.4, PDF pp. 282–285.
- Interchangeable modules without host recompilation: Section 10.5, PDF pp. 286–289.
- Host/guest memory agreement: Section 10.6, PDF pp. 289–291.
- Currency limits and current-source links: `notes/review-refactoring-to-rust.md`.
