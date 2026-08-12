# A Discount Can Fossilize Waste

A cloud bill arrives with an obvious opportunity: reserve the machines for a year and pay less per
hour. The discount is real, the approval is easy to explain, and the savings start appearing without a
single line of application code changing.

It can still be the wrong first move.

The late payoff of Alfonso San Miguel Sánchez and Danny Obando García's *Efficient Cloud FinOps*
is a sequence hidden inside its percentage-heavy case studies: **first determine what the workload
must do, then change how much technology it needs and when it needs it, and only then commit to a
lower rate for the stable remainder**. A reservation bought before those questions are answered does
not remove waste. It sells the waste back to you at a discount and makes it harder to leave.

That is why this book is worth finishing despite a serious currency boundary. Its July 2023 prices,
service generations, licensing claims, and provider-specific recipes are not a 2026 playbook. Some
worked details are technically weak. The durable reward is learning to see cost optimization as an
ordered engineering problem rather than a coupon hunt. [Receipt: Chapter 12's IaaS case and
conclusion, PDF pp. 366-380 / printed pp. 345-359; Chapter 6's ordering guidance, PDF p. 197 /
printed p. 176.]

## The idea: every discount preserves an assumption

Chapter 12 opens its first case by fixing the workload's constraints. The application serves 50 users,
is business-critical, needs fault tolerance, has development, preproduction, and production
environments, and cannot be modernized to PaaS because its vendor will not support that move. The
authors then price a one-for-one Azure migration at roughly $13,000 per month across the three
environments. They deliberately make the expensive baseline visible before changing it. [Receipt:
PDF pp. 366-369 / printed pp. 345-348.]

Now imagine buying reservations against that baseline. The rate would fall, but every original
assumption would quietly harden: two servers in every layer, production-like capacity everywhere,
all-day availability, the initial database topology, the selected machine families, and the expectation
that the application will remain in place for the commitment term.

The case study instead changes those assumptions in an order.

First it revisits architecture. Because the database only needs active-passive failover for this scenario,
the proposed shared-disk design removes a duplicated large disk and permits a less expensive SQL
Server edition. The exact design deserves an independent technical review, but the reasoning move is
the valuable part: ask which reliability property is required before paying for every mechanism the
old system happened to use. [Receipt: PDF pp. 370-372 / printed pp. 349-351.]

Next it revisits capacity by environment. Development loses redundant nodes and uses smaller
machines; preproduction stays close enough to production to support the stated tests. This is not
“make everything smaller.” It is “make each environment purchase only the property its job
requires.” The book's earlier rightsizing chapter explicitly warns that evidence may require scaling a
machine up, not down. FinOps is supposed to optimize the resource, not maximize the savings number.
[Receipt: case-study rightsizing, PDF pp. 372-374 / printed pp. 351-353; rightsizing caution, PDF
pp. 178-180 / printed pp. 157-159.]

Then it revisits time. Development and preproduction are scheduled off when the teams agree they are
not needed, while production remains available. A commitment made before this step would have
priced hours that the system could simply stop consuming. [Receipt: PDF pp. 374-375 / printed pp.
353-354.]

Only after architecture, size, and schedule does the case buy a one-year reservation for the remaining
production machines, checks the application's expected lifetime, and applies a licensing benefit only
to machines that stay on. The closing page makes the dependency explicit: reservations and license
benefits belong on already-rightsized VMs; shutdown is preferable where it works; commitments must
match the workload lifecycle. [Receipt: PDF pp. 375-380 / printed pp. 354-359.]

The useful mental model is an optimization ladder:

1. **Purpose:** What outcome and service level must exist?
2. **Shape:** Which architecture can provide it?
3. **Quantity:** How much capacity does that architecture actually consume?
4. **Time:** When must that capacity be running?
5. **Rate:** Which part of the remaining demand is stable enough to commit?

Each rung changes the denominator beneath the next one. Change the architecture and the machine
count changes. Change the size or schedule and the steady hourly demand changes. Retire the workload
and the sensible commitment becomes zero. That is why percentages cannot choose the order for you.

## The trap: a smaller bill is not necessarily more value

A 30% discount on an unnecessary machine remains unnecessary spend. The inverse matters too: a
cost increase can be an optimization if it buys an outcome the business needs.

Chapter 5 supplies the missing denominator through unit economics. Flat monthly cloud cost can
describe two opposite businesses: one tripled its users while cost stayed level; the other lost half its
users at the same spend. The bill alone cannot distinguish them. Cost per useful business unit can.
[Receipt: “Unit economics,” PDF pp. 153-157 / printed pp. 132-136.]

That earlier chapter prevents the late case study from degenerating into “71% is always good.” Before
changing a database topology, turning off preproduction, shortening retention, or moving work to a
managed service, someone must name the unit of value and the non-negotiable constraint. Requests
served, analyses completed by a deadline, active customers, recovery time, release confidence, and
regulatory retention are not decorative context. They determine whether the proposed saving is a
gain or a disguised service cut.

This gives every optimization proposal two ledgers:

- a **money ledger**: expected spend before and after the change;
- an **obligation ledger**: the availability, performance, recoverability, operability, and business
  outcome that must survive it.

The book's best moments keep both in view. Its weaker moments show why the second ledger matters.
In the PaaS case, the authors describe moving a relational warehouse to S3 as moving to a NoSQL
document store and later frame S3 versioning as protection replacing RDS Multi-AZ. Those ideas
collapse different properties. S3's standard storage already has built-in multi-AZ resilience;
versioning helps recover earlier object versions; RDS Multi-AZ provides database failover. An
architecture review must ask which property the workload actually needs before declaring the cheaper
shape equivalent. [Receipt for the book's proposal: PDF pp. 388-396 / printed pp. 367-375. Current
AWS boundary: <https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html> and
<https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html>.]

That flaw does not erase the sequencing lesson. It demonstrates its hardest requirement: never let the
spreadsheet silently redefine the service.

## Why the earlier chapters suddenly matter

Read backward from the Chapter 12 sequence and four earlier sections become instruments rather
than preliminaries.

Chapter 6 explains why commitment belongs late. Its rightsizing section starts with measured CPU,
memory, disk throughput, and IOPS, then permits scaling up, scaling down, or terminating based on
what the workload shows. Its reservation section calls for a stable perimeter and warns that a long
commitment can block later reduction. The final recommendation is almost an executable policy:
rightsize first, power-schedule second, reserve only what remains. [Receipt: PDF pp. 178-180 and
187-197 / printed pp. 157-159 and 166-176.]

Chapter 5 tells you what “right” means. Unit economics connects technical consumption to a business
unit, so a lower bill cannot claim victory while the service loses more value. It also forces engineering,
finance, and business participants to agree on a denominator rather than merely admire a trend line.
[Receipt: PDF pp. 153-157 / printed pp. 132-136.]

Chapter 4 gives the proposal a comparison method. Its as-is/to-be/gap exercise records the current
system, proposes alternative future states, calculates each initiative's cost effect, and adds the work
required to cross the gap. That matters because two changes with similar savings can have radically
different risk, reversibility, and effort. [Receipt: PDF pp. 130-133 / printed pp. 109-112.]

Chapter 1 supplies the loop: Inform, Optimize, Operate. The sequence is not a waterfall performed
once. New demand, releases, prices, and retirements change the evidence, so the practice returns to
measurement and revises the next action. [Receipt: the three pillars and iterative examples, PDF
pp. 35-40 / printed pp. 14-19.]

The backward dependency trail is therefore:

> Chapter 12's safe commitment depends on Chapter 6's measured usage, which depends on Chapter
> 5's unit of value and Chapter 4's comparable future states, all operated as the iterative loop introduced
> in Chapter 1.

The chapters are not ordered merely because fundamentals come before case studies. Each earlier
chapter supplies evidence that prevents the late discount from preserving the wrong thing.

## What has aged—and what remains useful

This first edition was published in February 2024, while its case-study prices were collected in 2023.
By August 2026 the surrounding discipline and provider catalogs have moved. The FinOps Framework
now speaks about maximizing technology value across public cloud, SaaS, licensing, data centers, and
other scopes. Microsoft says reservations for selected VM series became unavailable for new purchase
or renewal from July 2026. Current AWS guidance favors Savings Plans over EC2 Reserved Instances
for flexibility. [Identity: PDF pp. 2-3 and Packt's product page,
<https://www.packtpub.com/en-us/product/efficient-cloud-finops-9781805122579/>. Current boundary:
<https://www.finops.org/framework/>,
<https://learn.microsoft.com/en-us/azure/virtual-machines/prepay-reserved-vm-instances>, and
<https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/select-the-best-pricing-model.html>.]

There is also a concrete calculation to distrust. PDF pp. 188-189 use a formula that treats the
discounted term cost as a break-even point, then describe the result as applying to a no-upfront
reservation. A lower no-upfront hourly rate does not wait 7.5 months before producing savings. Keep
the chapter's warning about premature commitment; discard that worked claim.

What survives these changes is the dependency structure. Current Azure guidance still tells buyers to
determine the right VM size and analyze stable base usage before purchasing a reservation. The current
FinOps Framework still distinguishes usage optimization from rate optimization and treats the work
as an iterative choice among competing options. Products change; the danger of committing before
learning remains. [Current checks:
<https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/save-compute-costs-reservations>
and <https://www.finops.org/framework/phases/>.]

## Your one reading mission

Read **PDF pages 366-380 (printed pages 345-359)**, from the opening of Chapter 12 through the end
of the IaaS case study. Treat every price as historical; your subject is the order of decisions.

Before reading, write this sentence: “We are about to buy a one-year discount for the current
production footprint.” While reading, build a five-row table with these columns:
`rung`, `workload fact required`, `change proposed`, `evidence after change`, and
`commitment this could invalidate`. Use exactly these rows: purpose, architecture, quantity, time,
and rate.

You are finished when every proposed saving has an obligation beside it and the rate row names the
smallest stable remainder—not the current total—that you could responsibly commit to. Under the
table, write one sentence beginning: “We must not purchase the discount until ...” and complete it
with the single unknown your team would need to resolve first.

That page is the test of whether the chapter changed your next action. If the table causes you to delay
a purchase, resize a commitment, or investigate a service obligation before claiming savings, the
book has already paid for the trip to its final case study.
