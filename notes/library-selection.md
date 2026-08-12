# Library selection log

## Editorial policy

The download folder is a candidate pool, not a publication checklist. Every candidate
is assigned to one book subagent. The agent checks extraction quality, edition/date,
distinctiveness, and whether the book supports one concrete essay with a meaningful
reading mission. A pass produces one essay; a failure produces only a skip note.

## Gate results (2026-08-12)

The shelf grew only when a candidate added a durable, actionable destination. The
reader-facing order and recommended starting point live in `index.md`; this table is
the editorial audit trail.

| Candidate | State | Editorial reason |
| --- | --- | --- |
| *Machine Learning Engineering* | pass | Production design must contain model error with fallbacks, observability, and reversible rollout. The source had been mislabeled as *Modern Software Engineering*. |
| *Software Architecture: The Hard Parts* | pass | The final chapter supplies a reusable, contextual trade-off method. |
| *The Staff Engineer's Path* | pass | Catalytic influence makes good judgment persist without its originator. |
| *Refactoring to Rust* | pass | A migration becomes controllable when its unit is a testable, reversible seam. |
| *Practical Systems Programming in Go* | pass | The final indexer makes durability and concurrency claims concrete enough to audit. |
| *Database Internals* | pass | Coordinator failure exposes the difference between committed state and client knowledge. |
| *Defending APIs* | pass with currency boundary | The late lifecycle model is a stronger payoff than a vulnerability catalog; protocol details require current sources. |
| *Learning Systems Thinking* | pass with locator/currency boundary | The final case turns semantic drift in a stable mission into an inspectable modernization problem. |
| *Performance Analysis and Tuning on Modern CPUs* | pass with edition warning | A reversing thread-count curve and false sharing provide a durable hardware-level diagnostic payoff. Prefer the 2024 second edition for continued study. |
| *Efficient Cloud FinOps* | pass with major currency/accuracy boundary | The late case reveals why purpose, architecture, usage, and schedule must stabilize before a rate commitment. |
| *Designing Electronics That Work* | pass with currency boundary | The troubleshooting chapter separates a latent physical defect from the condition that merely exposes it. |
| *Building LLM Powered Applications* | skip | The 2023-era stack is stale and the late evaluation/deployment material is too shallow to carry a durable essay. |
| *Security-Driven Software Development* | skip | Clean extraction cannot rescue obsolete and unsafe examples, weak model-to-test traceability, and a thin final validation report. |

The shelf is coherent at eleven accepted essays. Selection stops here for this pass;
no candidate remains unfinished. Future expansion should begin with a fresh editorial
gate, not a category quota.

## Rejected before editorial review

- `Machine Learning Engineering (Andriy Burkov) (2).pdf` — observed SHA-256 is
  identical to `Modern_Software_Engineering_Doing_What_Works_to_Build_Better_Software.pdf`
  (`c5922886ab097065070dabbb73d3de8e3401985fad2fa7e16c37097f038e8234`). It is a
  mislabeled duplicate, not a separate book.
- Non-book PDFs, CVs, receipts, images, videos, and tiny prompt/roadmap artifacts are
  outside this shelf.
