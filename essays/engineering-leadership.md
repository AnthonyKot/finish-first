# What Decision Would You Make Differently?

We were half an hour into a sixty-minute meeting before anyone looked up from their laptop.

Up on the wall display was a dashboard with twenty-six widgets. Half the lines were green, four were bright red, and three had jagged vertical spikes that looked like an EKG during cardiac arrest. Our vice president of product pointed a laser pen at a red trough in the upper right corner and asked a simple question: "Are we doing well right now, or are we falling behind?"

Nobody spoke. My stomach dropped into the floorboards.

I had built nine of those widgets myself over two weekends. I knew exactly where the telemetry came from, which API endpoints fed the charts, and how the cron job sanitized the data every night at midnight. But sitting under the fluorescent lights with fourteen people waiting for an explanation, I realized I couldn't answer him.

I had given the executive team a wall of numbers when what they actually needed was a way to sleep at night.

We spent the remaining half hour debating whether a four percent dip in pull request throughput was seasonal noise or proof that our senior engineers were slacking off. Nothing was resolved, nobody learned anything, and we agreed to reconvene the following week with more graphs.

## The back of the book is where the author stopped being polite

Most leadership manuals bury their real convictions under hundreds of pages of polite scaffolding.

They spend seven chapters defining terms, sketching tidy organizational charts, and explaining how to schedule a recurring one-on-one. You read them patiently because you assume the foundation is mandatory before the hard stuff arrives.

When you crack open Juan Pablo Buriticá and James Turnbull’s *Engineering Leadership: The Hard Parts*, you can tell within five minutes where the authors' blood pressure actually spiked. The real book isn't in the opening taxonomies or the early frameworks.

The real book lives in the second-to-last chapter, where they finally tackle the nightmare of software metrics.

Everything before it was scaffolding to get you to this specific fight. The authors clearly spent years watching engineering leaders get humiliated in boardrooms by bad graphs, and by the time they sat down to write the ending, they were done playing nice.

Read forward, the book looks like a conventional curriculum on management hygiene. Read from the back, it is an emergency field kit for dismantling the surveillance state your company accidentally built out of Jira tickets.

## Treat your metrics as an internal product, not an inspection report

The standard response to a disastrous metrics meeting is to buy a new dashboard tool.

You assume the problem was the visual layout, or the latency of the data pipeline, or the fact that you weren't tracking cycle time with enough decimal places. You install another SaaS integration, invite thirty stakeholders to a workspace, and produce a brand-new set of squiggly lines that nobody understands.

The insight waiting at the end of the book is that your metrics are not a reporting requirement. They are an internal product.

Like any software product, metrics have specific users, those users have distinct jobs to be done, and shipping features nobody asked for is a waste of company capital. If you don't know who the customer is for a chart, you shouldn't be running the query that generates it.

The book identifies three distinct customer groups inside every technology company, and their needs almost never overlap:

- **Engineers**, who care about developer friction, slow builds, flaky tests, and broken feedback loops.
- **Engineering managers**, who care about systemic delivery bottlenecks and team sustainability.
- **Executives outside engineering**, who care about cost, return on investment, operational risk, and predictable delivery.

When you smear those three audiences across a single dashboard, you create an artifact that serves none of them.

Engineers see a surveillance system designed to micromanage their afternoons. Executives see an impenetrable wall of technical trivia about test coverage and lint errors. And managers spend their careers acting as frantic translators, trying to explain why a drop in story points doesn't mean the company is going out of business.

> Metrics without context are just numbers cosplaying as truth.

## Refuse the metric they ask for and answer the fear underneath it

When a stakeholder demands a specific metric, your first instinct as an engineer is to go build the query.

That instinct is dangerous. The people asking for numbers rarely know what data exists, let alone what that data means.

The authors tell the story of a chief executive who decided to read through recent pull requests to evaluate his team's output. He sorted the repository by lines of code committed, found two engineers who had produced thousands more lines than anyone else, and concluded they were carrying the entire department while their peers were slacking off.

Those two people were frontend engineers. They were committing compiled vendor bundles, minified CSS, and generated npm packages.

When the engineering leadership pointed this out, the CEO didn't apologize or back down. Instead, he asked the raw question hiding behind his misguided audit: "So how do I know who is a good engineer or not?"

That is the trap of want versus need. Stakeholders ask for metrics they can visualize—hours logged, tickets closed, lines typed—because they don't have the vocabulary to ask the harder question that keeps them awake.

Questions like *which team is most productive* or *how many commits did we ship this week* are almost always proxies for one universal anxiety: *Are we okay?*

Will the product ship in time to make payroll? Are we burning through investor capital without building enterprise value? Are we stable enough to sign that enterprise contract next month?

The book gives you the exact conversational lever to disarm that dynamic before you write a single line of SQL:

> "What decisions will these answers help you make? What would you do, or not do, differently if you had access to this information?"

In one running case study, an executive declared an individual engineer the team's most valuable player purely on the strength of a dark green GitHub contribution graph. The manager didn't argue about code quality or commit hygiene. She simply asked the VP what business decision he would make differently if he knew someone else committed more frequently.

The VP admitted: nothing.

The conversation immediately collapsed into reality. They stopped talking about vanity contribution charts and started talking about deployment frequency and change failure rates—numbers that actually dictate release planning and customer commitments.

A metric that changes no operational decision is not a metric. It is an expensive mood ring.

## A published individual leaderboard is an invitation to sabotage

The moment you attach a number to an individual engineer, you stop measuring engineering and start measuring self-preservation.

The authors illustrate this with a failure that should be required reading for anyone with administrative access to GitHub:

A manager noticed pull requests were languishing in code review for days on end. Hoping to expose the bottleneck, he began tracking pull request review latency broken down by individual reviewer, and he published the rankings to the team.

The slowest reviewer on the leaderboard saw his name at the bottom of the list. Naturally, he changed his behavior. He stopped reading code carefully and started rubber-stamping every incoming pull request within minutes of notification.

His personal velocity numbers skyrocketed. The dashboard turned a pleasing shade of green.

Within two weeks, the team's bug escape rate tripled.

When leadership finally dug beneath the surface of the crisis, they discovered why that engineer had been slow in the first place: his meticulous, thorough reviews had been catching eighty-nine percent of production bugs before they reached main. By optimizing for a single, isolated metric, the manager had successfully trained his best quality control gate to stop doing his job.

The fix was not to find a more sophisticated individual metric. The fix was to abolish individual review tracking entirely and measure team review time alongside bug escape rates as a paired counterweight.

When you measure review speed and defect escapes together, the underlying trade-off becomes visible to everyone. Speed without quality is reckless; quality without speed is paralysis.


If you track one without the other, your engineers will give you exactly what you asked for, and you will hate the result.

## Comparing velocities is like comparing apples to spaceships

Few metrics have destroyed more engineering morale than agile story points.

The authors don't mince words on this topic: velocity is an internal capacity-planning tool for a single squad, not an index of developer output. Comparing the velocities of two different teams is, in the book's exact phrasing, "like comparing apples to spaceships."

The moment an executive uses story points to rank teams against each other, Goodhart's Law detonates the system.

The authors trace a case where a company board demanded that an engineering department increase its quarterly velocity. The engineers obliged: team velocity rose from 30 points per sprint to 45 points per sprint over a single quarter.

On paper, productivity had soared by fifty percent.

In reality, the engineers had achieved the target by doing three predictable things: they inflated their point estimates during sprint planning, they stopped writing automated tests and documentation, and they deferred all maintenance on core infrastructure. Then a routine deployment took production down for six hours.

The team hadn't become fifty percent faster. They had simply taken out an unpayable high-interest loan on their future reliability.

Worse, dashboard-driven management actively punishes the invisible work that keeps an engineering organization alive.

Mentoring junior hires doesn't have a ticket number. Conducting careful system architecture reviews doesn't show up in a commit graph. Writing clear incident runbooks, patching flaky test suites, and building trust across organizational boundaries generate zero story points.

When goals and compensation are tied exclusively to what can be quantified, doing invisible work becomes career suicide.

The countermeasure is leadership hygiene: state out loud what your dashboards do not measure, rotate your team's operational focus periodically, and explicitly defend time on the calendar for the unmeasured work that prevents catastrophic failure.

## You cannot measure a system until you make it safe to tell the truth

There is a reason the metrics chapter sits at the very end of the book rather than at the beginning: you cannot safely measure an organization that hasn't built the structural prerequisites to handle reality.

Before you ever stand up a dashboard, you have to do the unglamorous organizational work laid out in the book's early sections: you must learn to name the specific chaos your company is trapped in rather than treating failure as a moral defect; you must claim measurement as a core product pillar focused on business outcomes rather than artificial deadlines; you must break the survival instinct that causes terrified teams to substitute frantic activity for genuine progress; you must establish the psychological safety that allows an engineer to report a missed milestone without fear of humiliation; and you must force leadership to choose between competing priorities so your team isn't measuring drift with pinpoint precision.

If those foundations are missing, any metric you introduce will be weaponized by management and gamed by staff.

Start with what you already emit. Git histories already track how often you deploy and how long code sits in a branch; your incident management platform already knows how often releases fail and how long recovery takes.

You don't need an enterprise analytics platform to find out if your delivery engine is broken. The answers are already sitting inside Jira, GitHub, and your CI/CD pipelines, waiting for someone to ask an honest question.

## Version your telemetry like code and delete what stopped working

Most engineering dashboards resemble abandoned warehouses: full of dusty, broken machinery that nobody knows how to operate or dares to turn off.

To treat measurement as a product, you have to give it the same maintenance life cycle you give your production software.

That means every metric must have an assigned owner who audits data quality, monitors whether the signal still aligns with business reality, and answers questions when numbers drift. It means metrics need versioning: a minor bump when an internal calculation is refined, and a major version bump with a formal changelog when a definition breaks historical comparisons—such as filtering out automated renovate bots or changing whether review latency counts weekends.

Most importantly, every metric must have an explicit retirement condition.

If a chart stops driving a business decision, you don't leave it running in the background to create cognitive debt. You deprecate it, announce its sunset, and delete the widget.

Here is the specification model the book uses to keep measurement honest:

| Field | Requirement | Purpose |
|---|---|---|
| **Metric Name & Version** | e.g., Team Review Cycle Time (v2.1) | Distinguishes current definitions from legacy calculations. |
| **Customer** | Engineers, Engineering Managers, or Executives | Names the single audience whose job-to-be-done this serves. |
| **Question Answered** | The specific operational question being investigated | Prevents collecting data without a clear hypothesis. |
| **Decision Changed** | The exact business choice that changes if the number moves | Eliminates vanity metrics that produce moods instead of actions. |
| **Owner** | Named individual responsible for health and triage | Prevents orphaned graphs and unaccountable reporting. |
| **Retirement Condition** | Concrete threshold or date when the metric gets deleted | Prevents permanent dashboard bloat and measurement fatigue. |

If you cannot fill in the "Decision Changed" column for a number you are tracking, stop tracking it. You are not running an engineering organization; you are running an expensive digital aquarium.

<!--mission-->
## Audit one number before tomorrow morning

The book is optional from here.

Bring one metric currently displayed on your company dashboard, pinned in a team Slack channel, or demanded by an executive during your last quarterly review. Pick the one that makes your jaw clench when people bring it up.

Open a text file, copy the six fields from the specification table, and fill them in right now:

1. **Metric Name & Version** — Give it a precise name and note whether the definition has silently shifted over time.
2. **Customer** — Pick exactly one audience: the engineers writing code, the managers unblocking delivery, or the leadership team funding the work.
3. **Question Answered** — Write out the single question this number answers. If it answers three questions, pick the most urgent one.
4. **Decision Changed** — What specific action will your team take if this number spikes by thirty percent next week? What will you stop doing if it drops?
5. **Owner** — Who is personally responsible for checking whether this data is accurate and fielding disputes?
6. **Retirement Condition** — Under what specific condition will you shut this chart down and delete the underlying alerts?

Look at line four.

If the "Decision Changed" line is blank—or if your answer is vague corporate sentiment like *we will keep a closer eye on quality*—you have found the reason your team hates your reporting meetings.

Print the card out, or drop it into your one-on-one document with your manager.

If the number changes a decision, keep it, assign an owner, and pair it with a counterweight so nobody games it. If it doesn't, schedule its retirement. When leadership asks why the chart disappeared, hand them the card with the empty line and ask the book's question back:

*What would you do differently if you had this number?*

It all comes out of the metrics chapter, the one that opens by asking why you would measure anything at all. Start there. The chapters in front of it will keep.
