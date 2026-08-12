# Book 11 — PLAN

## Pilot objective

Turn one legally held IT PDF into a source-backed reverse overview and test whether it
produces a real next reading action. Do not batch-process the library until this loop
works.

After the first pass, expand dynamically: one subagent per candidate book, one essay
per book that clears the editorial gate, and no target quota that rewards filler.

## Phase 1 — Choose and fingerprint one book

- Select a book the reader genuinely wants to finish.
- Record edition metadata and a file hash; keep the PDF under `resources/`.
- Record why it was saved, where reading stopped, and what would make finishing useful.
- Define one observable pilot outcome.

Exit: one manifest and a clear reason this book matters.

## Phase 2 — Recover trustworthy structure

- Extract metadata, table of contents, headings, page text, and page boundaries.
- Compare detected structure with the printed table of contents.
- Spot-check the beginning, middle, and end; record extraction failures.
- Store full extraction under ignored `workspace/`; commit only the verified structure
  and locators needed by the companion.

Exit: a page-addressable structure map whose errors are visible.

## Phase 3 — Build backward from payoff

- Inspect the last third plus conclusions, capstones, appendices, and final projects.
- Propose five to ten payoff candidates with source locations.
- Select the one strongest essay spine; automated ranking is not authority.
- Trace that payoff backward to prerequisite concepts and chapters.

Exit: selected payoffs and an evidence-backed dependency map.

## Phase 4 — Write the companion

- Draft “Why finish this book?”
- Draft one end-topic essay using the contract in `AGENT.md`.
- Turn its dependency trail into a short reading mission.
- Produce one minimal reader-facing index with a single recommended next action.

Exit: a companion that is useful without exposing the source text.

## Phase 5 — Test motivation honestly

- Use the companion with the original reader.
- Record whether a mission was started and completed, plus pages/concepts revisited.
- Ask what increased curiosity, what removed curiosity, and where trust broke.
- Revise the essay depth and mission size from that evidence.

Exit: evidence of a subsequent reading action, or a clear falsification of the current
format.

## Deferred until after the pilot

- Multi-book library ingestion.
- Personalized recommendation scoring.
- Chat, accounts, streaks, dashboards, or social features.
- Automatic publishing of generated companions.
