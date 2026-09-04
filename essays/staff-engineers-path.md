# Everything Good on My Team Stopped When I Stopped Pushing

There is a version of being useful that feels like the summit.

Every difficult design waits for your review. Every incident pulls you in eventually. Every uncertain engineer opens a DM before they open a pull request.

Your calendar becomes a solid wall of people who cannot proceed without you, and the wall reads as evidence. Look how much of this place runs through me.

I lived in that version for years. I was proud of it in the way you can be proud of something you also resent.

Then take an ordinary week off — not a sabbatical, a vacation — and watch what happens to the work you care about. Nothing catches fire. Things just wait. Decisions don't get made badly; they get made late, or not at all.

The backlog you come home to isn't a list of problems. It's a diagram of your own dependencies, drawn by other people, and you're at the center of it.

## The chapter that made me reread the rest

*The Staff Engineer's Path* is Tanya Reilly's book about senior individual contributors, and I had it filed under career advice — the genre I skim and forget.

Then I did what I now do with every technical book I've stalled on: started at the back.

The late chapter is about influence at scale, and it does something to the chapters in front of it. Read forward, they look like a sequence of good suggestions. Read backward from the end, they turn out to be prerequisites: knowing what your role actually is, knowing how power and information really move through your org, accepting that you can see more problems than you can personally solve, and behaving in a way that's worth other people copying.

You cannot make your judgment survive your absence until all four of those are true. That's why the chapter is at the back.

## Reach is the easy half. Persistence is the one that bites.

Reilly splits influence along two axes, and only one of them is the one everybody optimizes.

The first is reach: are you helping one person or a group? The second is persistence: does the improvement need you to keep supplying energy, or does it continue by itself?

That gives three tiers. **Individual** work grows one person's skill. **Group** work carries a change to several people at once. **Catalyst** work builds something through which the change keeps spreading after you stop pushing it.

A conference talk reaches a hundred people and has a short half-life. A small mentoring circle that teaches its members to mentor reaches fewer people this quarter and is still producing capable guides next year.

Scale isn't audience size. It's reach and durability together, discounted by however much of it still runs on you.

The chapter runs that model across four mechanisms, and laying them out on a grid is the most useful twenty minutes I've spent with a whiteboard:

| Mechanism | Individual | Group | Catalyst |
|---|---|---|---|
| **Advice** | Answer a colleague's question | Write documentation, give a talk | Build systems where colleagues advise each other |
| **Teaching** | Pair, coach one person | Run a class or codelab | Teach other people to teach |
| **Guardrails** | Review someone's work carefully | Checklists, style guides, templates, linters, presubmit checks | A culture where the safe practice feels normal |
| **Opportunity** | Delegate one project | Share the stage | Grow engineers who create opportunities for the people behind them |

Most of us are extremely good at column one and quietly convinced that column three is somebody else's job title.

## One question tells you which column you're actually in

The grid isn't the insight. The insight is the diagnostic it makes possible, and it fits in seven words:

> What currently stops when I stop pushing?

Run it down the four rows and it gets uncomfortable fast.

If every real answer about a system lives in your head, advice stops. If only you can teach the onboarding session, teaching stops. If safety depends on your approval, the guardrail doesn't stop — it becomes a queue, which is worse, because now you're also the reason things are slow. If interesting work only reaches people through your personal sponsorship, opportunity stops.

Each of those is a single point of organizational failure wearing the costume of leadership.

## Cloning yourself is not scaling

The obvious response is to broadcast harder. Write more docs. Schedule more classes. Install more rules. Build a Framework, capital F.

Reilly heads that off, and this is the part I did not expect from a book that could have sold me a maturity model.

The tiers are options, not a promotion ladder. Programs and frameworks create load of their own. Joining an initiative someone else already started often beats launching a competing one. Guiding a single team through one consequential design can matter more than rewriting a company-wide review process.

Because the test isn't *did I ship a framework*. The test is *did people become more able to exercise good judgment*.

Guardrails show the whole arc. At the individual end, a careful review lets someone move fast because they know an experienced person will catch the catastrophic mistake. In the middle, checklists and linters and presubmit checks encode that protection so it repeats without you. At the far end it's culture: people understand why the safe behavior is safe, and the author of the policy stops having to chase anyone.

That last move only works under three conditions Reilly is blunt about — the change has to solve a problem the organization actually has, it has to come with support, and you need allies. A guardrail nobody wanted is just compliance theater with your name on the commit.

## Delegation isn't handing over the tidy part

Here's where I found my own bad habit.

I thought I was delegating. What I was doing was slicing the ambiguity off a project, keeping it, and handing someone the clean remainder — then feeling generous about it.

A stretch assignment is supposed to contain the messy problem. What you owe the new owner isn't a simplified task; it's a credible safety net while they work on the hard one.

And delegation isn't finished while you're still the project's unofficial owner, quietly answering every question in the background. Redirecting those questions to the new lead isn't rudeness. It's the mechanism by which they get actual authority, because the org learns who to ask.

All of which runs into the thing nobody says out loud: other people will not do the work the way you would.

> If exact imitation is the standard, you haven't built leverage. You've built dependency with extra steps.

## You still have to be in the room sometimes

There's an honest boundary in this chapter that keeps the whole idea from tipping into self-erasure.

A staff engineer generally still needs some direct, visible execution. Disappear entirely into support work and the role stops being legible — to your peers, to your manager, and to you.

The move isn't absence. It's leaving a gap. Not answering the question you could answer instantly, so that someone else can answer it slowly. Bringing a less-senior colleague into the room where the decision happens, and then letting their judgment count.

Which reframes "plan to give away your job" from a threat into an architecture review.

A well-designed service does not require its original author to restart it by hand every morning. Why would a well-designed engineering organization require its most experienced person to manually restart good judgment in every single conversation?

<!--mission-->
## Run the dependency audit this week

This part asks nothing of the book. Take one recurring demand on your attention — a real one, the thing that landed in your DMs twice this week.

Write it as a single line:

*"When I stop supplying attention to ___, what stops is ___."*

Then place it on the grid. Which mechanism is it — advice, teaching, guardrails, or opportunity? Which column are you in right now?

Then pick one transfer experiment small enough to run before Friday. Let a colleague own the next design review while you sit behind them as the guardrail. Turn one repeatedly-given answer into a short, findable note. Redirect the next question about that project to its new owner instead of answering it.

One rule for the write-up: record what happened, not whether they did it your way. Judging the result by how closely it imitates you is how the dependency grows back.

If the experiment holds — if the thing kept moving while you weren't pushing — you already have the payoff, and you didn't need a new title or a bigger calendar to get it.

The chapter is “Good Influence at Scale,” if you want the original. It is the only one I would hand to someone cold.
