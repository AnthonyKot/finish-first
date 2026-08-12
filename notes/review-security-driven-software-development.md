# Editorial gate — *Security-Driven Software Development*

**Verdict: SKIP.** The PDF is correctly identified and extracts well, and its broad
"build security in" premise remains useful. It does not earn a finish-first essay.
The potentially distinctive thread—carry misuse cases and secure design models into
implementation and validation—dissolves into introductory surveys, untraceable
scores, and a weak final penetration-test report. Several security recipes are also
unsafe as 2026 guidance.

## Identity and source

- **Observed:** *Security-Driven Software Development: Learn to analyze and mitigate
  risks in your software projects*, by Aspen Olmsted. The title page is PDF p. 2.
- **Observed:** First edition, copyright 2024, first published February 2024 by Packt;
  ISBN 978-1-83546-283-6 (PDF p. 3). Packt's current catalog independently identifies
  Aspen Olmsted, first edition, March 2024, and 262 pages:
  <https://www.packtpub.com/en-us/product/secure-software-development-9781835462836?type=print>.
- **Observed:** The local resource and Telegram original
  `Packt.Security-Driven.Software.Development.pdf` have the same SHA-256:
  `56ad36b23f696865278bd1f2c82987b93283803b9e032b1e2e52f3a8fff1dea0`.

## Extraction gate

- **Observed:** Poppler reports 262 physical PDF pages. Fresh `pdftotext -layout`
  extraction produced 56,206 words, 456,840 bytes, and 262 form-feed boundaries.
  Fifteen text-empty pages are covers, separators, or intentional blanks; readable
  body prose resumes after each one.
- **Observed:** The title/copyright pages (PDF pp. 2–3), middle
  authentication material (PDF p. 131 / printed p. 114), Chapter 14
  (PDF pp. 222–244 / printed pp. 205–227), and final index page (PDF p. 262 /
  printed p. 245) preserve headings, paragraph order, and page labels.
- **Observed:** The numbered body has a stable `pdf_page = printed_page + 17`
  mapping. Chapter-opening numbers are chapter numbers, not broken page labels:
  Chapter 1 begins on PDF p. 20 / printed p. 3, and Chapter 14 begins on PDF p. 222 /
  printed p. 205. Extraction quality passes.
- **Observed warning:** The shell `file` utility reports only six pages, and
  `pdfseparate` emits recursive-dictionary warnings. Those results conflict with
  `pdfinfo`, 262 recovered page boundaries, and successful page-addressed extraction
  through PDF p. 262. Receipts are usable, but the PDF's unusual internal structure
  should not be silently mistaken for a six-page source.

## Currency and correctness gate

- **Observed in the book:** The Google SSO walkthrough tells readers to enable the
  Google+ API, choose among flows including the implicit flow, and install
  `google/apiclient:~2.0@dev` (PDF pp. 128–130 / printed pp. 111–113).
- **Observed, current check (2026-08-12):** Google says Google+ APIs and Google+
  Sign-In stopped functioning on March 7, 2019. Its current web-server guide uses
  authorization-code exchange and `google/apiclient:^2.15.0`; current Sign in with
  Google uses Google Identity Services. The example was therefore obsolete even
  when this book appeared:
  <https://developers.google.com/+/integrations-shutdown> and
  <https://developers.google.com/identity/protocols/oauth2/web-server>.
- **Observed, current check:** OAuth 2.0 Security Best Current Practice deprecates
  token issuance in the implicit grant, and the March 2026 OAuth 2.1 draft omits the
  grant. The book's list of possible flows is not a safe selection guide:
  <https://www.rfc-editor.org/rfc/rfc9700.html> and
  <https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/15/>.
- **Observed in the book:** The supposedly secure running example requires a mix of
  uppercase, lowercase, and symbol characters, stores the submitted password in a
  field, exposes it through `getPassword`, and repeats that design across three
  languages (PDF pp. 183–194 / printed pp. 166–177).
- **Observed, current check:** NIST SP 800-63B now says verifiers shall not impose
  character-composition rules, and OWASP says passwords should not be stored in
  plaintext but protected with an adaptive salted password hash:
  <https://pages.nist.gov/800-63-4/sp800-63b.html> and
  <https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html>.
- **Observed:** The durable framework references are not all stale. NIST still lists
  SSDF 1.1 as final guidance, and Microsoft's current Secure by Design practice still
  recommends use cases, scenarios, assets, and STRIDE-based threat modeling:
  <https://csrc.nist.gov/pubs/sp/800/218/final> and
  <https://www.microsoft.com/en-us/securityengineering/sdl/practices/secure-by-design>.
  Those valid foundations do not repair the book's worked examples.

## Distinctiveness and late-payoff gate

- **Observed:** The closest accepted essay, *Defending APIs*, already provides the
  stronger lifecycle-security payoff: risk-prioritized coverage across inventory,
  design, development, testing, protection, and governance. The other accepted
  essays address ML operations, architecture trade-offs, staff leverage, Rust
  migration, Go systems boundaries, and database failure semantics; they do not
  duplicate this candidate. Its chance to be distinct was end-to-end model
  traceability.
- **Observed:** That trace never becomes trustworthy. The functional-model chapter
  moves from a ticket-scalping misuse scenario to an unrelated four-step SQL
  injection sequence while claiming to incorporate the preceding scenarios
  (PDF pp. 40–41 / printed pp. 23–24). The threat-model capstone assigns bare STRIDE
  marks and unexplained 1–10 DREAD values to method names, without linking threats to
  requirements, mitigations, tests, or acceptance evidence (PDF pp. 111–113 /
  printed pp. 94–96).
- **Observed:** Basic teaching checks also fail. The Chapter 4 self-assessment says a
  UML lifeline is a horizontal message exchange and describes an activation bar as a
  horizontal bar above a lifeline; its answer key selects those incorrect choices
  (PDF pp. 77–78 / printed pp. 60–61).
- **Observed:** The final chapter is mostly one-paragraph taxonomies and screenshots
  of named tools (PDF pp. 222–239 / printed pp. 205–222). Its simplified report does
  not carry threat identifiers, evidence, severity rationale, model/test links,
  owners, or retest criteria (PDF pp. 240–243 / printed pp. 223–226). After a
  possible stored-procedure SQL injection, it recommends fixing the procedure and
  running an Nmap scan against a backup server—an activity that does not verify the
  stated application flaw (PDF p. 242 / printed p. 225).
- **Inferred:** An essay strong enough for this shelf would need to invent the
  missing traceability method, correct the security examples, and replace the late
  validation payoff. That would be a new secure-development essay using current
  sources, not a motivating path through this book.

## Decision

Do not create a manifest, structure map, or essay for this candidate. Keep it only as
an introductory topic inventory if useful. For the shelf, prefer a source whose late
case study demonstrably carries a threat from scenario and design boundary through
mitigation, executable security evidence, residual risk, and verified remediation.
