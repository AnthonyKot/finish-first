# Book 11 — CONTEXT (design seed)

## Working idea: The Book From the End

Book 11 explores a reverse overview for technical books: reveal the payoff near the
end, then map backward to the earlier chapters needed to reach it. The first artifact
is a **finish-first companion** for one PDF, built from verifiable structure and page
citations.

## Evidence we have

- **User-reported (2026-08-12):** the reader has many PDF IT books in a Telegram
  downloads folder.
- **User-reported (2026-08-12):** the reader typically starts at the beginning and
  does not finish.
- **User-reported (2026-08-12):** essays about topics near the end of a book may create
  motivation to finish it.
- **Observed in earlier projects:** PDF parsing has worked for some web-sourced PDFs.
  Book 11 must re-test that capability on the chosen local PDF rather than assume all
  layouts parse cleanly.
- **Hypothesis:** seeing a book's later payoff plus a backward dependency path will
  cause the reader to resume and progress farther than a conventional summary would.

## Primary job

When I am interested in a technical book but likely to abandon a linear read, I want
to see what valuable ideas wait later and how the early material leads to them, so I
can choose a meaningful route and finish the parts that matter.

## Smallest coherent learner journey

1. Choose one book and state why it was originally saved.
2. Inspect a source-backed map of its structure.
3. Read one essay built around the strongest high-value payoff in its later sections.
4. Follow that payoff's backward dependency trail.
5. Accept a short reading mission with exact pages and guiding questions.
6. Return with a note, explanation, or applied example that demonstrates progress.
7. Choose the next mission or deliberately stop with a recorded reason.

The recommended next action must always be one reading mission, not a wall of options.

## Core artifacts for one book

- `manifest`: title, authors, edition, source fingerprint, page count, extraction state.
- `structure`: printed and detected table of contents with page ranges.
- `payoffs`: candidate late-book ideas with evidence and editorial confidence.
- `dependency map`: payoff → prerequisite concepts → source locations.
- `essay`: one motivating reverse overview following `AGENT.md`.
- `reading missions`: small page ranges, purpose, questions, and completion evidence.
- `reader log`: chosen mission, result, friction, and whether another step followed.

## What this is not

- A book-wide chatbot.
- An automatic summary dump.
- A promise to finish every book cover to cover.
- A replacement for the author's explanations, examples, or exercises.
- A library-management product before the single-book loop works.
- A promise to publish something about every file in the download folder.

## Shelf policy (reader decision, 2026-08-12)

The shelf stays dynamic. Parse quality is necessary but not sufficient: outdated,
duplicative, shallow, or editorially empty books are skipped. Each candidate is owned
by one book subagent and either earns one essay or receives a documented skip verdict.

## Trust and copyright

The PDF remains local. Full extracted text and page images remain untracked. Derived
artifacts must point back to the exact edition and page locations. Quotations stay
short and necessary; original companion prose should direct reading rather than
reconstruct the source.

## Open questions for the pilot

- Does "near the end" mean the final chapters, the book's advanced ideas, or the ideas
  most valuable to this reader regardless of location?
- Should a reading mission preserve the author's order or permit a safe nonlinear
  route?
- What observable action best signals progress: pages read, notes made, a concept
  explained, code run, or a decision applied?
- Does a substantial preview motivate reading, or satisfy curiosity too completely?
