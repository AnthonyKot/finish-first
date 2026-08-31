# Editorial gate — *Web Hacking Arsenal*

**Verdict: PASS**, for the final chapter's reporting method and the business-logic reasoning that feeds
it. Not a pass for the technique chapters as current 2026 guidance.

## Identity

- **Observed:** The title page (PDF p. 4) reads *Web Hacking Arsenal: A Practical Guide to Modern Web
  Pentesting*, Rafay Baloch.
- **Observed:** The copyright page (PDF p. 5) states "First edition published 2025 by CRC Press",
  © 2025 Rafay Baloch, CRC Press as an imprint of Taylor & Francis Group, LLC. Library of Congress CIP
  data gives LCCN 2024007038 (print) and 2024007039 (ebook), ISBN 978-1-032-44717-9 (hbk),
  978-1-032-44719-3 (pbk), 978-1-003-37356-8 (ebk), DOI 10.1201/9781003373568, typeset by Apex
  CoVantage.
- **Observed:** The PDF's own metadata gives CreationDate 2024-06-28 and ModDate 2024-07-11, Creator
  Adobe InDesign 16.4, Producer Adobe PDF Library 16.0, 578 pages. Embedded Title and Author fields are
  populated and match the printed pages.
- **Observed discrepancy, recorded not reconciled:** the file was produced mid-2024; the printed edition
  statement and copyright are 2025. Both are in `manifest.yaml`. Nothing in the essay depends on which
  is authoritative.
- **Observed:** local resource SHA-256
  `e59f61dd659eed6f1fc9dce7507db5d4b4f609722b4d11e273a60373fd8832c1`, 8,957,628 bytes.

## Extraction gate — pass with limitations

- **Observed:** `pdftotext -layout` produced 578 form-feed page boundaries, matching Poppler's 578-page
  count exactly. 110,697 words, 854,454 bytes. Six text-empty page chunks (PDF pp. 1, 3, 21, 25, 29, 31),
  all front-matter blanks or separators; readable content resumes after each. One U+FFFD, on PDF p. 483
  (printed p. 452), inside a quoted origin string in the PostMessage section — isolated and outside the
  selected material.
- **Observed:** the printed contents (PDF pp. 6–20) extract completely, down to third-level section
  numbers and their printed page numbers. This gave a section-level structure map without inference.
- **Observed:** page mapping is a single constant. `printed page + 31 = PDF page`, verified at Chapter 1
  (1 → 32), Chapter 2 (37 → 68), Chapter 8 (316 → 347), Chapter 13 (472 → 503), Chapter 14 (509 → 540),
  the first index page (531 → 562), and the final index page (547 → 578, the last PDF page). Every
  chapter opening listed in the printed contents resolves to the predicted PDF page. Roman front matter
  uses a separate offset of +1 (Contents v → PDF 6; Foreword xxi → PDF 22; Preface xxv → PDF 26).
  Receipts are reliable.
- **Observed:** spot checks passed at title/copyright (PDF pp. 4–5), body opening (PDF p. 32 / printed
  p. 1), the Chapter 8 case studies (PDF pp. 347–352 / printed pp. 316–321), the whole of Chapter 14
  (PDF pp. 540–561 / printed pp. 509–530), and the last page (PDF p. 578).

Limitations that a pentesting book makes unavoidable:

- **Observed:** 462 `Figure N.M` captions extract; the images do not. Chapter 14 alone carries twenty
  figure captions (Figures 14.1–14.21) across printed pp. 511–528. The good executive summary
  (Figure 14.1), the deliberately bad one (Figure 14.2), the strategic-recommendation sample
  (Figure 14.3), the risk matrix (Figure 14.11), the historical-comparison charts (Figure 14.6), the
  technical-finding template (Figure 14.15), and all four ChatGPT outputs (Figures 14.18–14.21) exist
  only as images. The author's *analysis* of each extracts cleanly; the artifact being analysed does
  not. This is stated in the essay and turned into a reason to open the PDF rather than a claim about
  what the figures contain. It is a known unknown, not evidence of absence.
- **Observed:** code listings, HTTP requests, JSON bodies and shell commands extract with layout
  wrapping; long tokens can break across lines. Comprehension is fine; copy-paste fidelity is not
  assumed anywhere.
- **Observed:** screenshots of tool interfaces (Burp, ZAP, CVSS calculators, dashboards) carry much of
  the procedural evidence in Chapters 2–13. No claim in the essay depends on reading one.
- **Observed:** no bibliography section, table of figures, or glossary was found in the extracted front
  or back matter, although the CIP data says the book "includes bibliographical references and index."
  External references appear instead in a per-chapter "Extra Mile" section — fourteen of them, one at
  the end of each chapter (PDF pp. 66, 123, 182, 229, 257, 290, 346, 364, 403, 433, 468, 502, 539, 561).
  Whether a consolidated bibliography exists in the print edition is unknown from this file.

## Currency gate

The essay foregrounds Chapter 14's reasoning, which does not decay. Four currency problems are real and
are flagged in the essay rather than smoothed over.

- **Observed in the book:** "At the time of writing, CVSS is currently at version 3.1" (printed p. 517 /
  PDF p. 548).
  **Observed, current check (2026-08-31):** CVSS v4.0 is the released version, published by FIRST on
  1 November 2023 — before this PDF was produced in June 2024 — and it revised the User Interaction,
  Attack Complexity, and Attack Requirements metrics. The book's *criticisms* of CVSS survive; its
  version statement does not. <https://www.first.org/cvss/v4.0/>
- **Observed in the book:** readers are told to reference IDs "from both Mitre CVE and OSVDB (Open Source
  Vulnerability Database)" (printed p. 517 / PDF p. 548).
  **Observed, current check:** OSVDB was shut down permanently in April 2016, eight years before
  publication, and has not returned. This is a stale reference, not merely an aged one.
  <https://en.wikipedia.org/wiki/Open_Source_Vulnerability_Database>
- **Observed in the book:** section 14.9 names OSSTMM, NIST, and "the OWASP Top 10" as methodologies to
  state in a report, without an edition (printed p. 520 / PDF p. 551).
  **Observed, current check:** OWASP has since published the Top 10:2025, which introduces two new
  categories, moves Security Misconfiguration to A02, and folds SSRF into Broken Access Control. Naming
  the list without a year is now genuinely ambiguous in a report.
  <https://owasp.org/Top10/2025/>
- **Observed in the book, and to the author's credit self-declared:** Chapter 13 warns that "as browsers
  continually update to counteract XSS methods, some payloads might become obsolete at the time of
  reading or publishing this book" (printed p. 472 / PDF p. 503). Treat Chapters 2–13 payloads, tool
  flags, and filter bypasses as historical. Chapter 7's OAuth 2.0 and SAML sections (printed pp. 299–309
  / PDF pp. 330–340) should be read for attack shape only and checked against current RFCs before use —
  the same warning already recorded in `notes/review-defending-apis.md`.
- **Observed in the book:** the four ChatGPT prompt examples (printed pp. 525–528 / PDF pp. 556–559) are
  model-era artifacts whose outputs are images. The constraint stated around them is durable: findings
  contain PII, usernames and passwords, so data must be anonymized before processing, and output must be
  manually reviewed because it may be inaccurate (printed p. 525 / PDF p. 556).

## Distinctiveness gate

- **Observed:** the closest selected essay is *Defending APIs*, whose payoff is a defender-side coverage
  program across inventory, design, development, testing, protection, and governance. This candidate's
  payoff sits on the other side of the engagement: the tester's deliverable, and how a true finding
  becomes a decision an owner takes. No selected essay on this shelf addresses offensive testing or
  findings communication.
- **Observed:** the technique chapters *are* duplicative of the general web-security literature and of
  freely maintained sources (PortSwigger, OWASP cheat sheets) that the book itself points at (printed
  p. 508 / PDF p. 539). That duplication is one reason the payoff is not drawn from them.

## Why it earns an essay

- **Observed:** Chapter 14 (printed pp. 509–530 / PDF pp. 540–561) is the book's only method chapter and
  its last. It opens with valid bug bounty findings dismissed because the presentation made them hard to
  follow (printed p. 509 / PDF p. 540) and closes the loop with a Synack reward doubled after the report
  added context on why patient data matters to attackers (printed p. 523 / PDF p. 554). Between those it
  separates three reader tiers (printed pp. 509–510), states the tester's structural ignorance of client
  asset value with the decommissioning-server RCE example (printed pp. 516–517), gives three concrete
  reasons the author's practice usually declines CVSS (printed p. 519), and replaces it with a
  likelihood/impact matrix whose written rating definitions turn on organizational visibility, exploit
  ease, and existing controls (printed pp. 519–520). It ends with a QA process, not an exhortation
  (printed pp. 529–530).
- **Observed:** Chapter 8 supplies the reasoning dependency one chapter early: the security implications
  of a logic flaw "depend on the actual vulnerability and the business value of the application", and
  automated scanners are "extremely poor" at detecting them (printed p. 316 / PDF p. 347). Its eight
  case studies and three race-condition cases (printed pp. 316–332 / PDF pp. 347–363) are severities
  that no scoring vector can produce.
- **Editorial judgment:** the consequential reverse-overview idea is **a vulnerability is not the
  deliverable; the decision it produces is** — and severity is argued from the client's context rather
  than computed from the payload. That destination gives the 500 preceding pages a purpose beyond
  memorization, and it is the part of the book most likely to be skipped by exactly the reader who
  bought it for the arsenal.

## Scope decision

PASS for the reporting method, the impact-in-context argument, and the business-logic reasoning that
feeds it. Do **not** recommend this edition as a 2026 authority for payloads, WAF bypasses, tool
invocations, OAuth/SAML implementation, CVSS versioning, vulnerability-database references, or the
current OWASP Top 10. The essay stays at the level of methodology and reasoning and directs the reader
to the book's own material for technique; it reproduces no exploit sequences.

Current-check sources:

- [FIRST — CVSS v4.0](https://www.first.org/cvss/v4.0/)
- [OWASP Top 10:2025](https://owasp.org/Top10/2025/)
- [OSVDB shutdown (April 2016)](https://en.wikipedia.org/wiki/Open_Source_Vulnerability_Database)
