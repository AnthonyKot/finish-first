# API Security Is a Coverage System, Not a Product Purchase

The easiest API security program to approve is also one of the easiest to misunderstand: buy a scanner,
put a gateway in front of production, count findings, and call the estate protected. The final chapter of
Colin Domoney's *Defending APIs* offers a more demanding destination. Security is not something a
single tool does to an API. It is **continuous coverage over APIs you can identify, across decisions you
can assign to owners, from design through runtime and retirement**.

That is why this book is worth finishing. Its early chapters teach protocols, vulnerability classes,
breaches, and attacks. Its middle chapters move into design-time and runtime defenses. Chapter 13
finally reveals what those pieces are for: not an impressive toolbox, but an operating system for making
security repeatable across an organization. The book names six domains—inventory, design,
development, testing, protection, and governance—and describes each at non-existent, emerging, and
established levels (printed pp. 329–332 / PDF pp. 352–355). The categories matter less than the
relationship between them. A strong control in one domain cannot compensate indefinitely for a hole
in another.

This is a durable payoff even though this 2024 edition is no longer safe as a standalone source for every
protocol or product detail. Read it for the shape of the program. Check current standards before acting
on OAuth flows, framework settings, vendor capabilities, or risk-list numbering.

## The promise: turn “secure our APIs” into a bounded job

“Secure the API estate” sounds like an assignment, but it hides three unanswered questions: Which
APIs? Secure against what consequence? Who must change what they do?

Chapter 13 makes those questions operational. First, ownership is distributed. Product owners,
platform owners, architects, development teams, security teams, and executives can each own a
different decision. If those responsibilities remain implicit, the predictable results are duplicated work
and neglected work (printed pp. 323–327 / PDF pp. 346–350). Second, the book's maturity model
starts with inventory because an organization cannot manage exposure it cannot see. It proposes
tracking how new APIs appear, inspecting source repositories for hidden API artifacts, and discovering
runtime traffic; mature practice also deals with shadow and retired-but-still-live “zombie” APIs
(printed p. 329 / PDF p. 352).

Third, the rollout is deliberately smaller than the estate. The book warns that trying to cover everything
at once can produce visible effort without progress. Its alternative is to state the business objective,
select the highest-risk cohort, enroll that cohort, and widen the selection criteria only after the first
slice works (printed p. 333 / PDF p. 356).

Together these moves change a vague ambition into a bounded program:

1. Name the business loss you are reducing.
2. Find the APIs capable of producing that loss.
3. Assign the decisions that control the risk.
4. Establish coverage across their lifecycle.
5. Measure whether the coverage exists and works.
6. Expand to the next risk cohort.

Notice what is absent: “buy the definitive API security product.” Products can implement controls,
but they cannot decide which APIs matter, expose an unknown owner, resolve a disputed risk appetite,
or make a team retire an obsolete endpoint.

## The idea: six domains form one chain

The six-domain model becomes useful when you read it as a chain of evidence rather than a checklist.

**Inventory** answers whether the organization knows the API exists, where it runs, which version is
live, and who owns it. Without this, every percentage-based metric has a dishonest denominator. A
claim such as “90% of APIs are tested” means little when shadow APIs are absent from the count.

**Design** turns business risk into explicit constraints before code makes them expensive to change.
The book includes authentication, authorization, data exposure, privacy, reset mechanisms, abuse
cases, token lifecycle, and rate limits among the decisions that belong here; threat modeling tests the
assumptions around them (printed pp. 329–330 / PDF pp. 352–353).

**Development** asks whether the implementation preserves those decisions. Central enforcement of
authentication and authorization is preferable to scattered, endpoint-specific logic, and unexpected
input or failure must be handled defensively (printed p. 330 / PDF p. 353). A precise design is not a
control if the running code ignores it.

**Testing** supplies repeatable evidence before release. The book calls out authentication and
authorization bypass, excess data exposure, invalid requests, response behavior, rate limits, and
configuration drift; at the established level, security tests are integrated with delivery and can block a
release (printed p. 331 / PDF p. 354). A scanner finding is useful, but coverage means knowing which
claim was tested, on which API, at which change boundary, with what consequence on failure.

**Protection** assumes design, implementation, and tests will never eliminate all attack. Runtime
controls validate tokens and traffic, restrict resources, reject invalid operations or data, and feed
security telemetry into operational response (printed pp. 331–332 / PDF pp. 354–355). This is where
a gateway or firewall belongs: as one link in the chain, not the chain itself.

**Governance** keeps the previous five domains from becoming a one-time campaign. It standardizes
patterns and remediation, covers privacy and compliance, manages end-of-life APIs, updates people as
threats change, and tracks deviations (printed p. 332 / PDF p. 355). Governance is not a document
that declares the happy path. It is the mechanism that notices and resolves departures from it.

The consequential idea is the handoff between domains. Inventory gives design an object and an
owner. Design gives development a contract. Development gives testing an implementation. Testing
gives release an acceptance decision. Protection gives operators runtime evidence. Governance closes
the loop by turning evidence and exceptions into changed defaults. Weakness at a handoff is often more
dangerous than weakness inside a tool.

## The backward dependency trail

Once Chapter 13 is the destination, earlier chapters stop reading like a catalogue.

Begin with Chapter 11's runtime material. It compares WAFs, web-application-and-API protection,
gateways, and API firewalls by their tradeoffs rather than presenting one universal winner. The choice
depends on budget, maturity, skill, and risk; contract-enforcing protection also depends on an accurate
contract (printed pp. 298–299 / PDF pp. 321–322). This unlocks the protection domain, but also shows
why buying the last layer first is fragile.

Move backward to Chapter 8. Its design-first argument treats the OpenAPI definition as a source of
truth for data and security requirements (printed pp. 189–190 / PDF pp. 212–213). Its positive model
allows what the contract defines rather than attempting to enumerate every malicious input, but the
book states the crucial caveat: precision depends on a precise contract (printed pp. 203–205 / PDF
pp. 226–228). Threat modeling then asks what can go wrong before a scanner has code to inspect. In
the shipping-company example, abuse of request sequencing, rate, and exposed data arose from design
assumptions, not merely recognizable coding defects (printed p. 205 / PDF p. 228). This is the bridge
from design to testable policy.

Move backward again to Chapter 4. Ten breach studies turn abstract controls into failure stories. Their
closing lesson is not simply to memorize ten incidents; it is to examine root causes and notice repeated
patterns across authentication, authorization, exposed data, leaked keys, and business logic (printed
pp. 100–101 / PDF pp. 123–124). Those stories supply the “why” that Chapter 13 says a program must
start from. A medical-data API, payment API, and public catalog do not deserve identical priorities
merely because all three speak HTTP.

Chapter 3 supplies a vocabulary for classifying what went wrong, while warning that business-logic
failures resist simple automation because attackers violate assumptions about sequence, input, and
trusted partners (printed pp. 53 and 72 / PDF pp. 76 and 95). Classification helps route a problem to a
control; it does not replace threat modeling or ownership.

Finally, Chapter 1 provides the seed of the rollout. Its rough risk method considers network exposure,
data sensitivity, and access control, then recommends starting where security effort can return the
most value (printed pp. 21–22 / PDF pp. 44–45). Chapter 13 turns that small prioritization device into
a cohort strategy for a real portfolio.

The reverse path is therefore:

**risk objective → known cohort and owners → explicit design → faithful implementation → release
evidence → runtime protection and observation → governed expansion.**

The protocols and tools live inside that path. They do not define it.

## One reading mission

Read **PDF pp. 352–356** (printed pp. 329–333), from “The 42Crunch maturity model” through
“Assessing your current state.” These five pages contain the six domains and the argument for starting
with a high-risk cohort rather than the whole portfolio.

Carry three questions:

1. Which API in a system you know could cause the clearest business loss?
2. In which of the six domains is evidence about that API weakest—not the control weakest, but the
   evidence that a control exists and works?
3. Which person can accept the risk or cause that gap to be closed?

Completion evidence: produce a one-page **coverage card** for exactly one API. Record its owner,
business loss, exposure, sensitive data, and one observed fact for each domain: inventory, design,
development, testing, protection, and governance. Use `unknown` instead of guessing. End with one
next action assigned to one owner. The mission is complete when the card exposes a real unknown or
handoff—not when all six boxes look reassuring.

## Receipts

- Distributed ownership and the need to define responsibilities: printed pp. 323–328 / PDF
  pp. 346–351.
- Six maturity domains and their non-existent, emerging, and established states: printed pp. 329–332 /
  PDF pp. 352–355.
- Risk-first cohorts and current-state assessment: printed pp. 333–334 / PDF pp. 356–357.
- Secure landing zones as reusable defaults rather than per-team reinvention: printed pp. 334–335 /
  PDF pp. 357–358.
- Leading/trailing metrics and advice to begin with a small metric set: printed pp. 336–337 / PDF
  pp. 359–360.
- Upstream API and software dependency mapping: printed p. 338 / PDF p. 361.
- Design-first contracts, positive enforcement, and the precision caveat: printed pp. 189–205 / PDF
  pp. 212–228.
- Runtime protection tradeoffs: printed pp. 298–299 / PDF pp. 321–322.
- Breach-pattern conclusions: printed pp. 100–101 / PDF pp. 123–124.
- Business-logic assumptions and the limits of simple testing: printed p. 72 / PDF p. 95.
- Initial risk-based prioritization: printed pp. 21–22 / PDF pp. 44–45.

This essay uses the book as a guide to program shape, not as a 2026 implementation standard. See
`notes/review-defending-apis.md` for the edition audit and current-protocol warning.
