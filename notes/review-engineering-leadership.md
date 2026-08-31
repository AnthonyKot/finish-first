# Editorial gate — *Engineering Leadership: The Hard Parts*

## Verdict: PASS

This candidate earns one essay. The late payoff is concrete and testable:
Chapter 10 tells an engineering leader to build measurement the way they
build a product — named customers, a question each number answers, an
explicit decision the number changes, an owner, a version and changelog,
and a plan to retire metrics that stop driving decisions
[Receipt: ch. 10, "Metrics as a Product" through "Metrics Need Ongoing
Maintenance, Just Like Code"; PDF pp. 302–303 and 321–324; printed pp.
unknown (reflowed edition)]. Chapter 11 then confirms that this is the
book's feedback loop, not a side topic
[Receipt: ch. 11, "The Compass: Metrics and Measurement"; PDF pp. 334–335;
printed pp. unknown (reflowed edition)].

The dominant risk for this file was not currency. It was whether a
calibre EPUB→PDF reflow can support honest receipts at all. It can, with a
stated and enforced limitation. Details below.

## Identity

- **Observed:** *Engineering Leadership: The Hard Parts — Navigating Chaos
  to Build Teams That Deliver*, by Juan Pablo Buriticá and James Turnbull.
  Title page at PDF p. 3; the embedded PDF title and author fields agree.
- **Observed:** O'Reilly Media, Inc.; copyright © 2026 Worthwhile Technology
  LLC and James Turnbull; **First Edition, January 2026**; revision history
  "2026-01-20: First Release"; ISBN 978-1-098-17563-4. Copyright/colophon
  material at PDF pp. 4–5.
- **Observed:** 395 PDF pages; SHA-256
  `997b2d599d69ebb1bc7caa4a2f159b0a61743a349963159af829ddf6b233bc7f`;
  3,179,685 bytes; PDF 1.4; untagged; not encrypted.
- **Observed:** Producer and Creator are both `calibre (4.99.5)`, with a
  CreationDate of 2026-01-21. This is an EPUB→PDF conversion made the day
  after first release, not a publisher-typeset print PDF.

## Extraction gate — pass, with a hard constraint

- **Observed:** `pdftotext -layout` recovered 91,285 words across 395 page
  chunks. Only seven chunks are empty (PDF pp. 1, 64, 142, 164, 219, 222,
  and the trailing 396th split artifact); spot checks show these are
  cover/separator pages, not lost prose.
- **Observed:** Chapter openings are unambiguous and land on their own
  pages. Ch. 1 at PDF p. 14, ch. 2 at 29, ch. 3 at 63, ch. 4 at 97, ch. 5 at
  118, ch. 6 at 145, ch. 7 at 185, ch. 8 at 216, ch. 9 at 251, ch. 10 at 300,
  ch. 11 at 328. Every chapter closes with a signed "In Chapter N, we'll…"
  handoff, which independently confirms each boundary (verified at PDF pp.
  28, 62, 96, 117, 144, 184, 215, 250, 299).
- **Observed:** Beginning (PDF p. 14), middle (PDF pp. 118–131), and end
  (PDF pp. 300–344) all extract with coherent headings, paragraphs,
  punctuation, bulleted lists, sidebars, and footnote blocks. Table 10-1
  and Table 2-1 survive as readable text.
- **Observed limitation — no printed page numbers exist.** The reflow
  carries no running headers or footers; no page number appears anywhere in
  the extracted body, and the converted file contains no table of contents
  with page numbers. `printed_page` is therefore `unknown` for every row of
  the structure map. This is not a parsing failure; the numbers are absent
  from the artifact.
- **Observed — the edition's own addressing is section-based.** The book's
  index (PDF pp. 345–393) points at *section titles*, not page numbers (for
  example, "Goodhart's Law, Goodhart's Law"). Cross-references in the body
  name chapters, never pages: 61 "Chapter N" references and **zero** "see
  page N" references across the whole text. Chapter and section locators
  are consequently the native, edition-portable way to cite this book, and
  AGENT.md explicitly permits "a page, section, or chapter locator."
- **Observed limitation — figures are images.** Eight figures (2-1, 3-1,
  5-1, 6-1, 6-2, 7-1, 8-1, 8-2) extract as captions only; their content is
  not available. PDF p. 31 is caption-only for this reason. Any claim about
  a figure's content would be unsupported and none is made.
- **Observed limitation — PDF page numbers are file-specific.** PDF pages
  cited here are reproducible only against a file with the SHA-256 above. A
  differently converted copy of the same book will not line up. Every
  receipt therefore pairs the PDF page with a chapter *and* section title,
  which does survive re-conversion.

**Gate decision:** the boundary problem is real but bounded, and the failure
mode AGENT.md warns about — "page boundaries cannot be extracted reliably
enough for receipts" — does not apply. Boundaries within *this* file are
exact, and the section-title layer makes the receipts checkable by a reader
holding any copy. Pass, on condition that the essay and manifest state the
limitation plainly rather than implying page-precision the file cannot back.

## Currency gate

**Observed: current.** First Edition, January 2026, reviewed 2026-08-31 —
roughly seven months old. Chapter 10 includes a section on measuring
AI-assisted development that argues the methodology does not change, only
the measurements
[Receipt: ch. 10, "AI Doesn't Change Your Approach to Metrics"; PDF pp.
324–325; printed pp. unknown (reflowed edition)]. The DORA four are used as
a starting foundation, not as a novelty
[Receipt: ch. 10, "Choosing the Right Metrics for Your Context"; PDF pp.
308–310; printed pp. unknown (reflowed edition)]. Nothing in the selected
payoff depends on a tool version or a short-lived API. Named vendors (Jira,
GitHub, CircleCI, Copilot) are illustrative snapshots and the essay does not
lean on them.

## Duplication gate — distinct from *The Staff Engineer's Path*

Both books are about leadership, so this needed a real check.

- Reilly's book, already on the shelf, is about the **individual staff+ IC
  path**: role definition, organizational maps, finite personal time, and
  making influence outlive the influencer.
- Buriticá and Turnbull write for the **manager of a team inside a chaotic
  organization**: symptoms of organizational chaos, budgets, vendors,
  shipping cadence, technical strategy, and measurement under conditions
  where the numbers themselves are unstable
  [Receipt: preface, "Why You Should Read This Book"; PDF pp. 9–10; printed
  pp. unknown (reflowed edition)].
- The two payoffs do not overlap. Reilly's is *make good judgment travel
  without you*. This one is *make your measurement system a product with
  customers, or it will be used as a weapon before it is used as an
  insight*. The Staff Engineer essay never touches metrics design; this one
  never touches the IC influence ladder.

## Late-payoff gate

- **Observed:** Chapter 10 supplies the strongest late material and it is
  operational rather than motivational: identify three customer groups
  (engineers, engineering managers, leaders outside engineering) and ask
  them what they need; separate what stakeholders want from what they need;
  decompose a high-level question into per-audience subquestions with
  success criteria and a maintenance goal (Table 10-1); start with DORA plus
  one or two context-specific metrics, about five or six in total; and
  inventory the data you already have before buying a platform
  [Receipt: ch. 10, "Design Intentionally" through "Take Stock of What You
  Already Measure"; PDF pp. 303–312; printed pp. unknown (reflowed
  edition)].
- **Observed:** the single most reusable move in the book is one question
  used to kill a bad metric request: *"What decision would you make
  differently if you knew this?"*
  [Receipt: ch. 10, "The Trap of Want Versus Need", April's Story sidebar;
  PDF p. 305; printed pp. unknown (reflowed edition)].
- **Observed:** the chapter names its own failure modes — Goodhart's Law,
  context ignorance, and the invisible-work problem created by "what gets
  measured gets done" — and refuses the easy fix of measuring more
  [Receipt: ch. 10, "Humans and Metrics" through "What gets measured gets
  done"; PDF pp. 318–321; printed pp. unknown (reflowed edition)].
- **Observed:** the maintenance section is unusually concrete for a
  leadership book: version metrics like code, keep a changelog when a
  calculation changes, appoint an owner who acts as the metric's product
  manager, and delete metrics nobody uses
  [Receipt: ch. 10, "Metrics Need Ongoing Maintenance, Just Like Code"; PDF
  pp. 321–324; printed pp. unknown (reflowed edition)].
- **Observed, for contrast:** Chapter 11 is a synthesis and a pep talk. Its
  layered model (people/safety → direction → process → metrics → ecosystem)
  is genuinely useful as a map of the book, and its line that "metrics
  without context are just numbers cosplaying as truth" is memorable
  [Receipt: ch. 11, "The Compass: Metrics and Measurement"; PDF p. 335;
  printed pp. unknown (reflowed edition)]. But it recapitulates rather than
  adds. The essay opens on Chapter 10 and uses Chapter 11 only to show why
  the payoff sits where it does.

## Editorial risk

The chapter can be misread two ways, and the essay guards both. First, as a
mandate to instrument everything — the source caps the working set at about
five or six metrics and warns that metric overload is as bad as no metrics
[Receipt: ch. 10, "Choosing the Right Metrics for Your Context"; PDF pp.
308–310; printed pp. unknown (reflowed edition)]. Second, as licence to
grade individuals — the source is explicit that you measure teams, use
metrics as context rather than judgment, and find individual performance
signals in code review patterns and one-on-ones instead
[Receipt: ch. 10, "The Human Side of Metrics"; PDF pp. 315–318; printed pp.
unknown (reflowed edition)].

## Evidence labels

- **Observed:** everything above cited to a PDF page in this exact file.
- **Inferred:** that section-title locators will survive re-conversion of the
  same EPUB. This follows from the index and cross-reference style but has
  not been tested against a second conversion.
- **Hypothesis:** that the metric-spec artifact proposed in the essay's
  reading mission is small enough for a working engineering manager to
  finish in one sitting. Untested with this reader.

Reviewed 2026-08-31.
