# What Decision Would You Make Differently?

*A finish-first preview of Juan Pablo Buriticá and James Turnbull's*
Engineering Leadership: The Hard Parts, *First Edition (O'Reilly, January
2026).*

*A note on locators before we start. This copy is a calibre EPUB→PDF
conversion, and the conversion carries no page numbers: no running headers,
no footers, no printed pagination anywhere in the file. The book's own index
points at section titles rather than pages, and its 61 internal
cross-references all name chapters — never pages. So every receipt below
gives a chapter and section title, which any copy of this edition shares,
plus a PDF page that is only reproducible against a file with SHA-256*
`997b2d59…33bc7f`. *Printed pages are recorded as unknown because they do
not exist in this artifact, not because they were missed.*

## Promise

Somebody is going to ask you how the engineering team is doing.

The scene the authors open Chapter 10 with is a meeting, a question, and a
stomach drop: dashboards full of squiggly lines, some green, some red, and
nobody in the room quite sure what any of them mean for the health of the
product or the team
[Receipt: ch. 10 opening; PDF p. 300; printed pp. unknown (reflowed
edition)].

Most leadership books answer that scene with a list of better numbers.
This one answers it with a job title. Your metrics are a **product**. They
have customers — you, your engineers, and the executives outside
engineering. Like any product, they do not have to be perfect at launch, but
they do have to serve their users, solve a real problem, and get better over
time
[Receipt: ch. 10, "Metrics as a Product"; PDF pp. 302–303; printed pp.
unknown (reflowed edition)].

That reframing is the payoff of the book, and it is worth the walk to get
there, because it converts a permanent, exhausting political argument into
an ordinary product problem you already know how to run. You do user
research. You separate what users ask for from what they need. You write
down the question each number answers and the success criterion that makes
it legible. You ship a small first version. You give it an owner, a version
number, and a changelog. And you delete the ones nobody uses.

The reason this matters more in chaos than in calm is stated plainly in the
final chapter: in a chaotic organization the numbers will swing for reasons
that have nothing to do with your team — a vendor outage tanks a
deployment, half the team gets pulled into an emergency, bug counts jump
because you finally started counting properly. A raw number in that
environment is not neutral. It is actively misleading. "Metrics without
context are just numbers cosplaying as truth"
[Receipt: ch. 11, "The Compass: Metrics and Measurement"; PDF pp. 334–335;
printed pp. unknown (reflowed edition)].

## The idea: a question before a number, a decision before a question

The mechanism has three moves, and the middle one is the one worth stealing.

**First, name the customers.** The book splits them into three groups with
genuinely different needs: engineers, who almost always want metrics about
their own workflow friction; engineering managers, who want to find
bottlenecks; and leaders outside engineering, who are asking strategic
questions about cost, return, and speed. You are told not to guess — go ask
them
[Receipt: ch. 10, "Design Intentionally"; PDF pp. 303–304; printed pp.
unknown (reflowed edition)].

**Second, refuse the request as stated.** This is the sharp part. The
authors call it the trap of want versus need, and they illustrate it with a
CEO who read through recent pull requests, concluded that two engineers were
far more productive than the rest, and labelled the others lazy — because
the two had committed thousands of lines. They were the frontend engineers,
committing npm packages, JavaScript and CSS. The CEO's response was fair
and is the actual problem: "So how do I know who is a good engineer or not?"
[Receipt: ch. 10, "The Trap of Want Versus Need"; PDF p. 304; printed pp.
unknown (reflowed edition)].

The book's instruction here is not to win that argument. It is to answer the
question underneath it. Questions like *which team is most productive* or
*how many hours do engineers work* are almost always a proxy for one
question — "Are we okay?" — which unpacks into: will we meet our objectives,
are we getting value for the engineering spend, is quality sufficient, are we
executing? And the tool for getting there is two questions asked back:

> What decisions will these answers help you make? What would you do, or not
> do, differently if you had access to this information?

[Receipt: ch. 10, "The Trap of Want Versus Need" and "Constructing
Questions"; PDF pp. 305–306; printed pp. unknown (reflowed edition)].

In the book's running case study, a manager applies exactly that to a vice
president who has declared one engineer the MVP on the strength of a green
GitHub contribution graph. She asks what decision would change if she knew
who committed more often. The VP admits: nothing. So the conversation moves
to deployment frequency and change failure rate — numbers that do change
release planning and customer communication
[Receipt: ch. 10, "The Trap of Want Versus Need", In Practice sidebar; PDF
p. 305; printed pp. unknown (reflowed edition)].

That is the whole diagnostic, and it is portable: **a metric that changes no
decision is not a metric, it is a mood.**

**Third, decompose and specify.** A broad question is broken into
per-audience subquestions at increasing granularity, and each answer gets a
metric and a measurable success criterion. The worked example in Table 10-1
takes "our engineering velocity is acceptable and meets our business goals,"
narrows to "how long do CI/CD runs take," fixes success criteria (CI under
fifteen minutes, CI/CD under thirty), names the two metrics, and adds a
maintenance goal — the criteria are met in 95% of runs
[Receipt: ch. 10, "Constructing Questions" and Table 10-1; PDF pp. 306–308;
printed pp. unknown (reflowed edition)].

Then the volume control: you do not need a stock of metrics, you need a
focused set. Start with the four DORA metrics because they are well tested
and most toolchains already emit them, then add one or two tied to your
current worst pain — incident volume and MTBF if reliability is the problem,
cycle time and sprint goal achievement if predictability is, bug escape rate
and critical-path coverage if quality is, developer satisfaction and on-call
distribution if team health is. Five or six total. Collect four to six weeks
of baseline before changing anything, and reassess quarterly which metrics
actually drove a decision
[Receipt: ch. 10, "Choosing the Right Metrics for Your Context"; PDF pp.
308–310; printed pp. unknown (reflowed edition)].

And before buying anything: inventory what you already emit. Git and CI/CD
give you deployment frequency and lead time; incident management or
monitoring gives change failure rate and time to restore. One of the authors
worked with more than one team about to buy an expensive metrics platform
that turned out to already have all four DORA metrics sitting in Jira,
GitHub and CircleCI
[Receipt: ch. 10, "Take Stock of What You Already Measure"; PDF pp. 310–312;
printed pp. unknown (reflowed edition)].

## The trap: the product has a safety requirement

A product framing without a safety requirement produces a surveillance
system, and the chapter spends real space preventing that.

The rules are blunt. Measure teams, not individuals. Use metrics as context,
not judgment — a rising team cycle time plus an observation that one person
is struggling in review is a coaching opportunity, not a performance
evaluation. Frame the conversation as "how can I help you be more
effective?" rather than "your numbers are low." Let teams help choose their
own metrics, because people support what they help create. Individual
performance signals belong in qualitative places instead: code review
patterns, collaboration signals, delivery patterns, whether someone can
explain their work
[Receipt: ch. 10, "The Human Side of Metrics"; PDF pp. 315–318; printed pp.
unknown (reflowed edition)].

The book earns that rule with a failure. A manager tracks pull request
review time by reviewer to find bottlenecks, publishes it, and the slowest
reviewer starts rubber-stamping to improve his score. Bug escape rates
triple in two weeks. The deeper look shows his slow reviews had been
catching 89% of production bugs before shipping. The fix is not a better
individual metric; it is tracking team review time and bug escape rate
*together*, so the trade-off between them is visible
[Receipt: ch. 10, "The Human Side of Metrics", In Practice sidebar; PDF p.
317; printed pp. unknown (reflowed edition)].

Three named failure modes follow, and they are the reason the product
framing needs maintenance rather than a launch:

- **Goodhart's Law.** When a measure becomes a target it stops being a good
  measure. In the case study, a board demands improved velocity, story
  points rise from 30 to 45, and the team gets there by skipping
  documentation, waving through "trivial" reviews, and deferring all
  technical debt — until a routine deployment takes production down for six
  hours
  [Receipt: ch. 10, "Goodhart's Law" and its In Practice sidebar; PDF pp.
  318–319; printed pp. unknown (reflowed edition)].
- **Context ignorance.** Never publish a number without saying what it
  measures and what an outlier means, because an audience left to fill the
  gap will always fill it with something you did not want
  [Receipt: ch. 10, "Context ignorance"; PDF pp. 319–320; printed pp.
  unknown (reflowed edition)].
- **Invisible work.** "What gets measured gets done" has a shadow: mentoring,
  documentation, careful review, and stakeholder relationships do not appear
  on a dashboard, and when goals are tied to metrics that work becomes
  career-limiting. The answer is not to measure everything — that is metric
  fatigue — but to say out loud what you are *not* measuring and why it
  still matters, rotate the focus metrics periodically, and protect time for
  the unmeasured work
  [Receipt: ch. 10, "What gets measured gets done"; PDF pp. 320–321; printed
  pp. unknown (reflowed edition)].

Velocity gets its own section as the worst offender: it is a capacity
planning tool, not a productivity metric, and comparing two teams' velocities
is "like comparing apples to spaceships." Used correctly it stays inside the
team, gets read as a rolling average for planning, and is interesting mainly
when it moves sharply. One team's 40% drop over two sprints, tracked
privately and therefore safely, surfaced technical debt in a critical
component and made the case for a remediation sprint
[Receipt: ch. 10, "Velocity: The Most Misused Metric in Software"; PDF pp.
312–314; printed pp. unknown (reflowed edition)].

Finally, the part that makes this a product rather than a project: metrics
need maintenance like code. Version them — a minor bump for a tweak, a major
bump when historical comparison breaks. Keep a changelog; if you change
review-time calculation to exclude weekends, write it down or better still
give the new thing a new name. Appoint an owner who watches data quality,
checks alignment with team goals, fields questions, and prioritizes
improvements — a product manager for your metrics. And phase metrics out
when they stop driving decisions, after checking nobody still depends on
them
[Receipt: ch. 10, "Metrics Need Ongoing Maintenance, Just Like Code"; PDF
pp. 321–324; printed pp. unknown (reflowed edition)].

## The backward dependency trail

Chapter 10 sits second-to-last because a measurement product is the *last*
thing you can safely build, not the first. Five earlier chapters supply what
it stands on.

**First, the diagnosis (Chapter 1).** "No meaningful measurement" is listed
as one of ten symptoms of organizational chaos, alongside lack of ownership,
undefined process, blame culture, and frequent crisis mode. Without data,
issues fester unnoticed until they blow up, improvements and regressions
happen without anyone understanding why, and there is no reliable way to run
a useful postmortem
[Receipt: ch. 1, "No Meaningful Measurement"; PDF p. 20; printed pp. unknown
(reflowed edition)]. The same chapter then turns it into an opportunity in
one line — "No metrics? You define success"
[Receipt: ch. 1, "Chaos or Opportunity?"; PDF p. 21; printed pp. unknown
(reflowed edition)]. Read ch. 1 (PDF pp. 14–28) for the vocabulary that lets
you name which chaos you are actually in.

**Second, the mandate (Chapter 2).** The five pillars — people, mission,
plan, process, product — are mapped onto those symptoms, and "product" is
the pillar that explicitly owns *meaningful measurement, outcome focus, and
quality standards*. Everything the team does should have measurable impact
[Receipt: ch. 2, Table 2-1 and "The Five Pillars of Engineering Leadership";
PDF pp. 32–33; printed pp. unknown (reflowed edition)]. The chapter's closing
exercise pushes the same point: success is not hitting a deadline, and
outcomes are not always features — infrastructure and technical debt are the
silent engines, and it is the leader's job to make that value visible
[Receipt: ch. 2, "Know What Success Looks Like" and "Outcomes Aren't Always
Features"; PDF pp. 58–60; printed pp. unknown (reflowed edition)]. That is
the same invisible-work problem Chapter 10 later meets in dashboard form.
Read ch. 2 (PDF pp. 29–62), especially pp. 30–33 and 58–60.

**Third, the discipline (Chapter 3).** This is where the book explains *why*
teams reach for measurable activity in the first place: in unstable
environments teams grab what they can measure — velocity, story points,
deployment frequency — because measurable activity feels safe when
everything is uncertain. It is a survival response, not laziness, and
"activity without direction burns people out faster than honest idleness"
[Receipt: ch. 3, "Focus on Outcomes"; PDF p. 80; printed pp. unknown
(reflowed edition)]. The chapter also warns that outcome frameworks like
OKRs fail when they substitute better goal-setting for better context
understanding, and it names *measurement illusion* — spending more time
tracking progress than making it, building elaborate dashboards nobody uses
for a decision — as a failure mode, with an explicit forward pointer to
Chapter 10
[Receipt: ch. 3, "Why Outcome Frameworks Miss the Point" and "Failure Modes
of Outcome Obsession"; PDF pp. 81 and 84; printed pp. unknown (reflowed
edition)]. Read ch. 3 (PDF pp. 63–96), especially pp. 80–85.

**Fourth, the safety precondition (Chapter 4).** Measurement lands on people,
and people who feel unsafe do not report honestly. Chapter 4 puts
psychological safety before functionality and before capability, argues that
your first job is to lower the threat level, and is careful that safety does
not mean comfort — it means people can be honest without fear of punishment
or humiliation
[Receipt: ch. 4, "It Starts with Safety"; PDF pp. 97–98; printed pp. unknown
(reflowed edition)]. Chapter 9 restates it as the foundation of collaborative
decision making, with a CTO who shot down ideas he disagreed with until
engineers stopped proposing anything he might dislike
[Receipt: ch. 9, "Psychological Safety"; PDF p. 293; printed pp. unknown
(reflowed edition)]. Publish an individual metric into a team that lacks this
and you get the rubber-stamped code reviews from Chapter 10, on schedule.
Read ch. 4, PDF pp. 97–99.

**Fifth, the thing you are measuring *against* (Chapter 5).** A metric with
no chosen direction measures drift precisely. Chapter 5's case is a team with
30 competing priorities that said yes to everything: closed tickets, shipped
code, full calendars, and no agreement on what mattered — momentum from the
outside, drift from the inside. The breakthrough was putting all 30 on a
table, arguing, and coming out with six, two per team
[Receipt: ch. 5 opening and "What Good Direction Looks Like"; PDF pp.
118–119 and 126; printed pp. unknown (reflowed edition)]. The chapter's
instruction is to anchor to outcomes and measure every new request against
them: "without an anchor, every wave knocks you off course"
[Receipt: ch. 5, "Reactive Roadmaps and Consensus Traps" through "Be the
Lighthouse"; PDF pp. 130–131; printed pp. unknown (reflowed edition)]. Read
ch. 5 (PDF pp. 118–144), especially the drift material at pp. 118–126 and
130–131.

Read in that order the sequence stops being a table of contents and becomes a
prerequisite chain: name the chaos, claim the product pillar, learn to tell
activity from progress, make it safe to tell the truth, pick a direction —
*then* build the instrument.

## What the ending changes

Chapter 11 is a synthesis chapter, and its layered model is the clearest
statement of why the metrics chapter is next to last. The stack runs:
people and psychological safety as the foundation, direction as the
lighthouse, lightweight process as the engine, and metrics as **the
compass** — the feedback loop that tells you whether the other three are
working
[Receipt: ch. 11, "The Foundation: People and Safety" through "The Compass:
Metrics and Measurement"; PDF pp. 330–335; printed pp. unknown (reflowed
edition)].

The closing advice is the same anti-big-bang instruction as the metrics
rollout: take stock, pick one area, commit to it for at least a month, watch
how it lands, adjust, and only then add one more thing. Trying to change
everything at once just adds to the chaos
[Receipt: ch. 11, "The Practice: Making It Real"; PDF pp. 338–339; printed
pp. unknown (reflowed edition)].

## Aging

Minor, and worth stating precisely. This is a January 2026 first edition
read seven months later. The metrics argument does not depend on a tool
version; DORA is used as a starting foundation rather than a novelty, and
the chapter's AI section argues explicitly that AI changes the specific
measurements and how you present them, not the methodology — segment
AI-assisted from traditional work, watch quality alongside speed, and add a
trust dimension
[Receipt: ch. 10, "AI Doesn't Change Your Approach to Metrics"; PDF pp.
324–325; printed pp. unknown (reflowed edition)]. The named tools (Jira,
GitHub, CircleCI, Copilot) and the specific AI productivity numbers in the
case study are 2025-era snapshots and should be treated as illustrations, not
findings. Nothing in the selected payoff rests on them.

## One reading mission

Read **Chapter 10, PDF pp. 300–312 and 315–324** — the design half
("Metrics as a Product" through "Take Stock of What You Already Measure")
and the human and maintenance half ("The Human Side of Metrics" through
"Metrics Need Ongoing Maintenance, Just Like Code"). Skip pp. 312–314 on
velocity unless story points are currently a live argument where you work.
[Receipt: ch. 10, sections as named; PDF pp. 300–324; printed pp. unknown
(reflowed edition).]

Carry three questions:

1. For each number my team or my leadership currently looks at: what
   decision would somebody make differently if it moved?
2. Which of my current metrics are attached to an individual rather than to
   the team, and what would people start doing if they optimized for them?
3. What valuable work does my team do that appears on no dashboard, and who
   knows that I know it matters?

Completion is not "I read twenty-five pages." Write a one-page **metric
spec** for a single number — an existing one you cannot defend, or one you
have been asked for. Six fields, borrowed from the book's own worked example
and its maintenance rules: *customer* (which of the three groups), *question
it answers*, *decision it changes*, *success criterion*, *owner*, and
*retirement condition* — what would have to be true for you to delete it.
Then do the cheap thing first: check whether the data already exists in Git,
CI/CD, your issue tracker, or your monitoring before you propose collecting
anything new.

If the spec cannot be completed — if the "decision it changes" line stays
blank — you have learned something more useful than a new dashboard. That is
a metric to retire, or a request to send back with the book's own question
attached.

## Receipts

All PDF pages refer to the calibre EPUB→PDF conversion with SHA-256
`997b2d599d69ebb1bc7caa4a2f159b0a61743a349963159af829ddf6b233bc7f`, 395
pages, produced 2026-01-21. **This edition has no printed page numbers**, so
printed pages are `unknown` throughout; chapter and section titles are the
edition-portable half of every citation and the book's own index and
cross-references use the same convention.

- Edition identity, publisher, first edition January 2026, ISBN
  978-1-098-17563-4: copyright and revision pages, PDF pp. 4–5.
- Book structure and the two-half split: preface, "Why You Should Read This
  Book"; PDF pp. 9–10.
- Chaos symptoms, "No Meaningful Measurement", "No metrics? You define
  success": ch. 1; PDF pp. 15, 20–21.
- Five pillars and the product pillar's ownership of measurement; success,
  quality, and invisible work: ch. 2, Table 2-1; PDF pp. 32–33 and 58–60.
- Activity as a survival response; measurement illusion; forward pointer to
  Chapter 10: ch. 3; PDF pp. 80–84.
- Psychological safety as the first move: ch. 4; PDF pp. 97–98. Restated for
  decision making: ch. 9; PDF p. 293.
- Drift, the 30-priorities case, and anchoring to outcomes: ch. 5; PDF pp.
  118–119, 126, 130–131.
- Opening scene and "why measure anything at all": ch. 10; PDF pp. 300–301.
- Metrics as a product; three customer groups: ch. 10; PDF pp. 302–304.
- Want versus need; the lines-of-code CEO; "what decision would you make
  differently"; "Are we okay?": ch. 10; PDF pp. 304–306.
- Question decomposition and Table 10-1: ch. 10; PDF pp. 306–308.
- DORA four plus one or two context metrics; five to six total; baseline and
  quarterly review: ch. 10; PDF pp. 308–310.
- Inventory before buying: ch. 10; PDF pp. 310–312.
- Velocity as capacity planning, not productivity: ch. 10; PDF pp. 312–314.
- Measure teams not individuals; support not surveillance; the review-time
  failure: ch. 10; PDF pp. 315–318.
- Goodhart's Law, context ignorance, invisible work: ch. 10; PDF pp. 318–321.
- Versioning, changelog, ownership, retirement: ch. 10; PDF pp. 321–324.
- AI does not change the approach: ch. 10; PDF pp. 324–325.
- Conclusion, measurement as illumination: ch. 10; PDF pp. 325–327.
- The layered stack and metrics as compass; "numbers cosplaying as truth":
  ch. 11; PDF pp. 330–335.
- One thing for a month, then add one more: ch. 11; PDF pp. 338–339.
- Figures 2-1, 3-1, 5-1, 6-1, 6-2, 7-1, 8-1 and 8-2 are images and extract as
  captions only; no claim above depends on a figure's contents.
