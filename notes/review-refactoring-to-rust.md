# Editorial gate — *Refactoring to Rust*

**Verdict: PASS**, as an architecture-and-migration essay rather than a current setup guide.

## Identity

**Observed:** The title page names *Refactoring to Rust* by Lily Mara and Joel Holmes
(PDF p. 4). The copyright page gives 2025 and ISBN 9781617299018 (PDF p. 5). No
edition number is printed, so the manifest records “edition not stated” instead of
guessing. Manning's product page confirms the same authors, ISBN, 304-page extent,
and June 2025 publication date: [Manning — *Refactoring to Rust*](https://www.manning.com/books/refactoring-to-rust).

## Extraction gate

**Observed:** Poppler recovered 14,829 layout-preserved lines / 727,496 bytes and all
304 PDF-page delimiters. The printed body pagination is stable: PDF page = printed
page + 19. Spot checks passed:

- Beginning, PDF p. 20: Chapter 1's title, hierarchy, prose, and printed page number are readable.
- Middle, PDF p. 152: Chapter 4's NGINX/FFI prose and annotated listing are readable.
- End, PDF p. 295: Chapter 10's conclusion and summary are readable.
- Selected payoff, PDF pp. 282–290: the host/module contract, dynamic loading,
  interchangeable search modules, and memory-boundary discussion are readable.

The PDF is untagged. Two-column contents, diagrams, and marginal code annotations
occasionally interleave in plain text, and a visible callout-production artifact lands
inside a listing on PDF p. 294. None prevents page-addressable receipts for the chosen
essay. Full extraction remains ignored under `workspace/refactoring-to-rust/`.

## Currency gate

**Observed:** Publication is recent, but parts of the tool recipe predate its release.
Chapter 10 repeatedly builds `--target wasm32-wasi` (for example, PDF pp. 281, 289,
and 294). Rust's current platform documentation says that target was renamed
`wasm32-wasip1` in March 2024 and describes Preview 1 as a compatibility target,
while current standardization centers on the Component Model and WASI 0.2:
[Rust target documentation](https://doc.rust-lang.org/stable/rustc/platform-support/wasm32-wasip1.html).
The examples also use `#[no_mangle]` (PDF pp. 280, 291, 294); Rust 2024 requires the
explicit `#[unsafe(no_mangle)]` form:
[Rust 2024 unsafe attributes](https://doc.rust-lang.org/edition-guide/rust-2024/unsafe-attributes.html).
Current WasmEdge documentation still supports the broader host/module pattern, but
its SDK and dependency matrix must be checked rather than inferred from the pinned
book examples:
[WasmEdge Rust SDK](https://wasmedge.org/docs/embed/rust/intro/).

**Editorial judgment:** These changes age the commands and APIs, not the central
claim. The essay therefore does not teach the book's exact WasmEdge setup or imply
that a sandbox alone makes arbitrary code trustworthy.

## Distinct payoff

**Observed:** The late-book example builds a host around a small search interface
(PDF pp. 282–284), loads the selected Wasm module dynamically (PDF p. 284), then
implements a second search module behind the same contract (PDF pp. 286–289). The
host changes behavior without recompilation when the replacement satisfies that
interface (PDF p. 289). The next section exposes the price of that flexibility: host and
module must agree on memory allocation and representation (PDF pp. 289–291).

Earlier chapters supply the proof obligations. Chapter 1 argues for small deployable
changes, reused tests, comparison, and controlled rollout (PDF pp. 20–23), and gives
an explicit plan/implement/verify/deploy loop (PDF pp. 28–30). Chapter 3 separates
unsafe FFI adaptation from ordinary reusable Rust business logic (PDF pp. 95–96).
Chapter 6 says to isolate a candidate and benchmark both paths (PDF pp. 184–185,
195, 203–204). Chapter 7 runs old and new implementations against the same inputs
(PDF pp. 225–229).

**Inferred:** The strongest reverse overview is not “WebAssembly is the future.” It is
**the migration unit is a seam, not a codebase**: make the contract explicit, preserve
the old behavior as an oracle, replace one implementation, and keep reversal cheap.
This is concrete, consequential, and not duplicated by the currently selected
architecture, ML-engineering, or staff-engineering companions.

**Scope decision:** PASS for migration reasoning and boundary design. Do not use the
book alone as a 2026 reference for Rust editions, dependency versions, WASI target
names, Wasm security, or copy-paste integration code.
