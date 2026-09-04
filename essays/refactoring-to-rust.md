# The Rewrite Died in Month Seven. One Function Shipped in Week Two.

The document was titled *Proposal: Rust*. Eleven pages, and I still think it was correct.

The service was slow in a way profiling had already explained. The hot path was doing something the language we wrote it in was bad at. Everyone agreed. The proposal was approved in principle, which is the specific kind of approval that means nothing has been approved.

Seven months later there was a Rust branch nobody could merge, a production system nobody had touched, and a quarterly planning doc where the whole thing had quietly become a bullet point under *Deferred*.

The failure wasn't technical. Not one line of that branch was wrong.

The failure was that we had proposed replacing a system, and there is no Tuesday on which a company can safely replace a system. There are only Tuesdays on which it can replace a function.

## Reading a migration book in the order a migration actually goes

I've been running an experiment on fourteen technical books: enter each one at its final chapter and work backward. Not skimming — reading the ending as the thesis, then treating everything before it as the argument that earns it.

Lily Mara and Joel Holmes's *Refactoring to Rust* is the book where that reading order stopped feeling like a trick.

Read forward, the nine chapters in front of the ending look like a Rust tour with stops: ownership, unsafe, C interop, Python extensions, testing, WebAssembly. A syllabus.

Read from the last chapter back, they stop being topics. They're the prerequisites for one small demonstration at the very end, and every one of them is load-bearing.

## The demonstration is boring, which is the point

Here is the ending, stripped down.

A small Rust host program loads a WebAssembly module that searches papers. Then it loads a different module that searches books. Different internals, different data.

The host is not recompiled. Nothing in its code names either module.

That's it. No performance chart, no benchmark victory. Just: two implementations, one contract, and a host whose source has no opinion about which one answers.

Which is the whole migration argument in miniature.

> You don't migrate a codebase. You migrate one seam, and then you go home.

## A seam is a bundle of agreements, not a function name

The demonstration looks simple until something real has to cross the boundary.

WebAssembly hands you a small set of primitive values. The moment you want a string, the host and the module have to agree on representation, on who allocates, on how it's read back. The book walks straight into linear memory for exactly this reason — interchangeability is never free.

So the seam isn't the signature. It's everything you had to settle to make the signature honest:

- which inputs are valid, and who checks;
- which outputs and which failures are visible from outside;
- which side owns the memory and who releases it;
- whether a call may block, retry, or run concurrently;
- how old and new behavior get compared;
- how you choose an implementation, and how you take it back.

Six lines. If you can't fill them in, you don't have a migration candidate. You have a complaint about a component.

## Put everything dangerous in the adapter and nowhere else

The same problem shows up much earlier, at the C boundary, and the fix generalizes.

Rust cannot infer the lifetime or ownership of memory that something else created. Cross into foreign memory and you have personally taken on proof obligations the compiler used to carry for you.

The move the book makes is to corral those obligations into a thin exported wrapper: convert the C string, validate it, then hand an ordinary Rust string reference to a separate `evaluate` function that knows nothing about any of it.

Here's the shape I now sketch on a whiteboard before writing any of it:

```rust
// Adapter — the only place that knows about pointers, C strings, unsafe.
#[unsafe(no_mangle)]
pub extern "C" fn evaluate_ffi(input: *const c_char) -> ... {
    let checked_input = /* convert the C string, validate, bail on garbage */;
    evaluate(checked_input)
}

// Core — ordinary Rust. Unit-testable, reusable, boring.
pub fn evaluate(input: &str) -> ... {
    // the actual behavior lives here
}
```

The adapter knows the foreign world. The core knows the business rule. Neither knows the other's problems.

That split is what makes the safety claim reviewable. "It's written in Rust" means nothing if unchecked assumptions are smeared through the whole component, and "it runs in a sandbox" means nothing if the host is handing out broad capabilities or misreading guest memory.

> The useful question was never whether the new thing is safe. It's how small you can make the part nobody has verified.

## The old code is your answer key

The seam gives you something a rewrite never does: two implementations that exist at the same time and accept the same input.

The book uses this on the Python side. Generate randomized inputs, run them through the original implementation and the Rust replacement, assert the results match.

This does not claim the old behavior is good. Plenty of it won't be.

It claims something more useful: differences become visible before somebody accidentally reclassifies them as improvements. Once equivalence is explicit, an intentional change gets reviewed as a change — instead of riding along inside a language migration where nobody will find it.

## Your intuition will be wrong twice

The Python example moves only JSON parsing into Rust and leaves the I/O where it was. Then it benchmarks both paths.

The first unoptimized build is barely worth the trouble. The release build tells a completely different story.

I've stopped reading that as a fact about compiler flags. It's a fact about me: intuition failed twice in a row — first about where the expensive work was, then about whether the replacement had fixed it. Only measurement caught either one.

And measure the seam itself, not just the function behind it. Conversion at the boundary is real work, and it is charged to you.

## Not every painful component is a migration candidate

The honest limit arrives early in the book, and I wish I'd read it before writing eleven pages of proposal.

Two conditions gate the whole approach. You have to already be able to deploy frequently — a seam whose entire value is small reversible steps is worthless attached to a quarterly release train. And your organization has to be able to maintain the Rust it takes on, after the person who was excited about it moves teams.

A hotspot with no stable boundary, no measurable pain, and no owner isn't ready. It's just annoying.

## What aged, and what didn't

The book is from 2025 and parts of its ending are already stale. The final examples use the older `wasm32-wasi` target name and pre-2024-edition `#[no_mangle]`, where current Rust wants `wasm32-wasip1` and `#[unsafe(no_mangle)]`. The pinned runtime APIs need checking against current docs.

Read the ending for its sequence, not its commands. Binary, then a callable function, then a host, then a second interchangeable module, then the memory agreement that lets richer values cross.

The friction is the lesson. Every convenient cross-language call is sitting on top of somebody's decision about representation, capabilities, ownership, and failure.

<!--mission-->
## Write the seam card before you write the proposal

You can run this without reading a page. Choose one component you'd describe as slow, risky, or awkward — a real one, the one you complained about twice this month.

Give it one page, six fields, no prose:

- **Behavior** — the smallest valuable thing this does, stated without naming a technology.
- **Contract** — inputs, outputs, and every failure a caller can observe.
- **Ownership** — who allocates, who frees, who validates, and what happens on a bad input.
- **Oracle** — how you'd prove the new path agrees with the old one on inputs you didn't hand-pick.
- **Measure** — the number that has to move, at the seam, including conversion cost.
- **Switch** — the specific mechanism that sends traffic back, and who is allowed to pull it.

Then the test. Hand it to another engineer: could they build a second implementation from the card alone?

If they can, you have a migration you could start on Tuesday and undo on Wednesday.

If they can't, the field where they got stuck is the actual work — and it was always going to be the actual work, whether or not you ever wrote a line of Rust. The card takes an hour. The proposal took me eleven pages and seven months, and it never found the ambiguity that killed it.

For the original, find “WebAssembly interface for refactoring.” The last third is the only part I'd hand to someone in a hurry.
