# AGENT.md — Book 11 working contract

Read `CONTEXT.md` before researching, extracting, designing, or drafting. Read
`PLAN.md` before choosing the next task. This project inherits Book 10's lean
research layout and Book 8's reader-first, evidence-first discipline; it does not
inherit either book's subject matter.

## Who this is for

The first reader owns many IT books, often begins at page one, and often stops before
the later chapters. The product must make the destination visible and make the next
reading step feel worthwhile. Do not invent broader personas until evidence supports
them.

## Product rule

Build a **finish-first companion**, not a generic PDF summary or a chat box. Each
selected book earns exactly **one standalone essay**. Begin with its strongest valuable
idea, conclusion, case study, or project near the end, then trace the earlier concepts
that make that payoff understandable.

Every useful overview must answer:

1. Why is this book worth finishing?
2. What valuable ideas wait in its later sections?
3. Which earlier chapters unlock each idea?
4. What is the smallest honest next reading step?
5. Where in the source can the reader verify every book-specific claim?

## Evidence discipline

- Label consequential product claims as **observed**, **user-reported**,
  **inferred**, or **hypothesis**.
- Never claim to have parsed or read pages that were not successfully extracted and
  checked.
- Every source-specific statement must retain a page, section, or chapter locator.
- A missing extraction is unknown, not evidence that the book omits something.
- Keep source PDFs and full extracted text local-only. Commit manifests, structured
  analysis, short quotations when justified, citations, and original companion prose.
- Do not reproduce a source book or write a chapter-by-chapter substitute for it.

## Essay contract

An end-topic essay is a motivating preview, not exhaustive notes. It should contain:

- **Promise:** the practical or intellectual payoff.
- **Idea:** enough explanation to make the topic legible.
- **Dependency trail:** the earlier concepts that unlock it.
- **Reading mission:** exact chapters or pages and questions to carry into them.
- **Receipts:** source locations for claims and any short quotations.

Prefer concrete engineering decisions, failure modes, code, and tradeoffs over vague
claims that a topic is "important." Spoilers are allowed when they create direction;
compression that removes the need to read is a failure.

## Editorial gate

Selection is dynamic; the presence of a file does not create an essay obligation. One
book agent owns one candidate and must reject it before drafting when any of these
conditions materially undermine the result:

- text or page boundaries cannot be extracted reliably enough for receipts;
- the available edition is too outdated for the claims the essay would foreground;
- the book is duplicative of a stronger selected book without a distinct payoff;
- inspection finds no concrete, consequential idea worth a reader's time.

A rejection gets a short evidence-backed review note and no consolation essay. A pass
gets one essay, one reading mission, and book-specific corpus artifacts. Prefer a small
shelf of essays with real editorial conviction over coverage of every parseable file.

## Working rules

- Pilot one book before designing a library, recommendation engine, or dashboard.
- Use one subagent per candidate book; book agents must not edit shared indexes or
  another book's artifacts.
- Preserve reading order as source metadata even when presenting a reverse path.
- Separate extraction output from editorial judgment so either can be corrected.
- Treat completion, understanding, and motivation as different outcomes.
- The pilot succeeds only if the reader takes a meaningful next step in the book;
  opening an overview is not success.
