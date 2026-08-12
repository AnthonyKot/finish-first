# Editorial gate — *Defending APIs*

**Verdict: PASS**, with a strict currency boundary.

## Identity

**Observed:** The embedded title page identifies *Defending APIs: Uncover advanced defense
techniques to craft secure application programming interfaces* by Colin Domoney (PDF p. 2). The
copyright page says copyright 2024, first published February 2024, Packt Publishing Ltd., and ISBN
978-1-80461-712-0 (PDF p. 3). Packt's current product page independently lists the paperback as a
384-page first edition published in February 2024. The original Telegram file and the local resource
have the same SHA-256 hash.

Publisher check: [Packt product page](https://www.packtpub.com/en-us/product/defending-apis-9781804617120).

## Extraction gate

**Observed:** `pdftotext -layout` recovered 11,697 lines, 95,307 words, and 715,649 bytes. The
extraction contains 384 form-feed boundaries, matching Poppler's 384-page count. Spot checks passed:

- Beginning, PDF pp. 2–3: title, author, publisher, date, and ISBN are readable.
- Middle, PDF p. 192: prose, running header, printed page number, and a figure caption are readable.
- Selected payoff, PDF pp. 346–363: Chapter 13's prose, lists, headings, and printed page numbers are
  readable.
- End, PDF p. 384: the final page is readable.

The shell `file` utility reports 25 pages, but that result conflicts with both `pdfinfo` and successful
page-addressed extraction through physical PDF p. 384; it is treated as a parser quirk, not a source
defect. Figures and screenshots are not dependable in text extraction, but the selected essay does not
rely on their visual content. Full extraction remains local-only under `workspace/defending-apis/`.

## Currency gate

**Observed:** The book is recent enough to discuss the 2023 OWASP API Security Top 10, and OWASP's
API project still presents the 2023 edition as its current API-specific list. However, the book captures
that update while it was still a release candidate. Its preview table assigns Server-Side Request
Forgery to API6 and Lack of Protection from Automated Threats to API8 (printed pp. 72–73 / PDF
pp. 95–96). The final OWASP list instead uses API6 for Unrestricted Access to Sensitive Business
Flows, API7 for SSRF, and API8 for Security Misconfiguration. Later chapters partly reflect the final
categories, so the book should not be used as the definitive list without checking OWASP directly.

**Observed:** Authentication guidance also requires a current primary-source check. The book calls
OAuth 2.0 a standard for web and API “authentication,” and says an access token effectively confirms
identity (printed pp. 42 and 45 / PDF pp. 65 and 68). That wording blurs OAuth authorization with
authentication. Since publication, IETF RFC 9700 (January 2025) has become OAuth 2.0 Security Best
Current Practice, and RFC 10017 (July 2026) adds browser-application guidance. Do not treat the
book's OAuth overview, flow selection, or implementation examples as current normative advice.

**Observed current check:** The narrower essay spine remains live. NIST still recommends integrating
secure-development practices into each SDLC implementation; as of August 2026, NIST lists SSDF
1.1 as final and a 1.2 revision as draft. That supports the durability of lifecycle integration, not the
book's named vendors, maturity ratings, or every proposed control.

Current-check sources:

- [OWASP API Security Top 10 — 2023 contents](https://owasp.org/API-Security/editions/2023/en/0x00-toc/)
- [IETF RFC 9700 — OAuth 2.0 Security Best Current Practice](https://www.rfc-editor.org/rfc/rfc9700)
- [IETF RFC 10017 — OAuth 2.0 for Browser-Based Applications](https://www.rfc-editor.org/rfc/rfc10017)
- [NIST Secure Software Development Framework publications](https://csrc.nist.gov/Projects/ssdf/publications)

## Distinctiveness gate

**Observed:** No existing selected essay in this shelf is dedicated to API or application security.
The closest thematic overlap is organizational decision-making in the architecture and staff-engineer
essays, but this book's capstone supplies a different object: measurable security coverage over an API
estate and its delivery lifecycle.

## Why it earns an essay

**Observed:** Chapter 13 does more than append management advice to a vulnerability catalog. It
defines six connected program domains—inventory, design, development, testing, protection, and
governance—and gives rough maturity states for each (printed pp. 329–332 / PDF pp. 352–355). It
then rejects an all-at-once rollout: establish a business objective, identify the highest-risk cohort,
assess its current state, and widen coverage later (printed p. 333 / PDF p. 356). Ownership must be
explicit because responsibility spans product, platform, development, operations, AppSec, and
executive roles (printed pp. 323–328 / PDF pp. 346–351).

**Editorial judgment:** The genuinely consequential reverse-overview idea is: **API security is a
risk-prioritized coverage system, not a product purchase**. An unknown endpoint cannot be governed;
a design control without implementation and testing is only intent; a clean build without runtime
observation is only a snapshot; a protection appliance without ownership becomes unattended
configuration. That capstone gives the earlier material a useful destination and can be applied without
repeating aging configuration advice.

**Scope decision:** PASS for the lifecycle-program argument. Do not recommend this edition as a
standalone 2026 authority for OAuth/OIDC, framework configuration, product selection, exact risk
rankings, or copy-paste security controls.
