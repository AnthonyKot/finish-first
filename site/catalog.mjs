export const essays = [
  {
    slug: "software-architecture-hard-parts",
    title: "Nobody in That Microservices Argument Is Discussing the Same Decision",
    book: "Software Architecture: The Hard Parts",
    authors: "Neal Ford, Mark Richards, Pramod Sadalage & Zhamak Dehghani",
    domain: "Architecture",
    payoff: "Three people, one room, ninety minutes, and everyone is right. Here is the move from the last chapter that ends the meeting in four.",
    artifact: "Five-row trade-off table",
    mission: "Chapter 15 · 6 min read",
    missionLabel: "Try this this week",
    caution: "Product examples reflect 2021; the decision method is intentionally tool-independent.",
    recommended: true
  },
  {
    slug: "machine-learning-engineering",
    title: "Nothing Changed. The Model Got Worse Anyway.",
    book: "Machine Learning Engineering",
    authors: "Andriy Burkov",
    domain: "ML systems",
    payoff: "The model file hasn't been touched in four months. The predictions are worse anyway, every dashboard is green, and a support ticket is the only thing that noticed.",
    artifact: "Five-field failure-envelope note",
    mission: "Chapter 9 · 6 min read",
    missionLabel: "Draw one envelope this week",
    caution: "The source is a 2020 draft; treat tools as historical and the systems argument as the payoff."
  },
  {
    slug: "staff-engineers-path",
    title: "Everything Good on My Team Stopped When I Stopped Pushing",
    book: "The Staff Engineer’s Path",
    authors: "Tanya Reilly",
    domain: "Engineering leadership",
    payoff: "Your calendar is full because everything waits on you, and that looks exactly like influence. One question from the last chapter tells you which parts of your team would survive a week without you.",
    artifact: "One dependency audit",
    mission: "Chapter 8 · 6 min read",
    missionLabel: "Run this before Friday",
    caution: "Organizational examples are dated snapshots; the influence model is the durable part."
  },
  {
    slug: "refactoring-to-rust",
    title: "The Rewrite Died in Month Seven. One Function Shipped in Week Two.",
    book: "Refactoring to Rust",
    authors: "Lily Mara & Joel Holmes",
    domain: "Migration",
    payoff: "The rewrite proposal is correct, approved in principle, and quietly dead by Q3. The last chapter explains why — and what you ship instead on Tuesday.",
    artifact: "Six-field seam card",
    mission: "Chapter 10 · 6 min read",
    missionLabel: "Fill one card tonight",
    caution: "The final WebAssembly recipe has aged; read it for boundary design, not copy-paste setup."
  },
  {
    slug: "practical-systems-programming-go",
    title: "The Server Said “ok.” Nobody Asked the Disk.",
    book: "Practical Systems Programming in Go",
    authors: "Mihalis Tsoukalos",
    domain: "Systems programming",
    payoff: "A search index replays its journal after a reboot and comes back four hundred files short — every one of them acknowledged. The last chapter shows exactly where the promise breaks, and its own code does not fix it.",
    artifact: "Three-row guarantee ledger",
    mission: "Chapter 14 · 6 min read",
    missionLabel: "Audit one ack this week",
    caution: "The project is current and instructive, but several shown error paths do not earn their claimed guarantee."
  },
  {
    slug: "database-internals",
    title: "The Database Committed. Your Client Timed Out. Both Are True.",
    book: "Database Internals",
    authors: "Alex Petrov",
    domain: "Distributed systems",
    payoff: "A retry loop turned one $24,000 invoice into two. The database never failed — only the acknowledgment did, and the client could not tell the difference.",
    artifact: "Five-moment knowledge ledger",
    mission: "Chapter 14 · 7 min read",
    missionLabel: "Trace one endpoint",
    caution: "This is the first 2019 release; one local Paxos sentence is explicitly corrected in the essay."
  },
  {
    slug: "defending-apis",
    title: "The Gateway Was Running. The Zombie Endpoint Leaked the Data Anyway.",
    book: "Defending APIs",
    authors: "Colin Domoney",
    domain: "Security",
    payoff: "The dashboard showed 1,412 findings and a button to block threats at the edge. Nobody could say who owned the endpoint that mattered, or whether it should still be running at all.",
    artifact: "One-API coverage card",
    mission: "Chapter 13 · 6 min read",
    missionLabel: "Eight fields, one API",
    caution: "Use the lifecycle model; verify OAuth, OWASP numbering, frameworks, and products against current sources."
  },
  {
    slug: "learning-systems-thinking",
    title: "The Mission Stayed the Same. Every Word Inside It Died.",
    book: "Learning Systems Thinking",
    authors: "Diana Montalion",
    domain: "Systems thinking",
    payoff: "Everyone nodded at the mission on the wall, then went back to their desks and built incompatible software. Not technical debt — semantic debt.",
    artifact: "Six-row purpose-word ledger",
    mission: "Chapter 12 · 7 min read",
    missionLabel: "Audit your nouns",
    caution: "The local PDF is an EPUB reflow, so receipts use physical PDF pages and no printed-page mapping."
  },
  {
    slug: "performance-analysis-tuning-modern-cpus",
    title: "The Fifth Thread Made the Program Slower",
    book: "Performance Analysis and Tuning on Modern CPUs",
    authors: "Denis Bakhvalov",
    domain: "Performance",
    payoff: "One thread: forty-eight seconds. Four: fourteen. Five: twenty-two. Nothing was locked, nothing was shared, and the cores were fighting anyway.",
    artifact: "Four-row thread-count autopsy",
    mission: "Chapter 11 · 6 min read",
    missionLabel: "Run the sweep tonight",
    caution: "Prefer the expanded 2024 second edition; exact 2020 tool commands and event names are snapshots."
  },
  {
    slug: "efficient-cloud-finops",
    title: "The Reservation Saved Thirty Percent. The Bill Barely Budged.",
    book: "Efficient Cloud FinOps",
    authors: "Alfonso San Miguel Sánchez & Danny Obando García",
    domain: "Cloud economics",
    payoff: "Finance signed a thirty-two percent discount on ninety-six machines. Three months later the invoice was higher. We had not reduced the waste — we had signed a contract to keep paying for it.",
    artifact: "Five-row optimization ledger",
    mission: "Chapter 12 · 7 min read",
    missionLabel: "Card it before you sign",
    caution: "Prices, SKUs, licensing, and provider architectures are historical; the ordering rule is the payoff."
  },
  {
    slug: "designing-electronics-that-work",
    title: "The Screws Didn't Break the Board. They Exposed the Joint.",
    book: "Designing Electronics That Work",
    authors: "Hunter Scott",
    domain: "Electronics",
    payoff: "Flat on the bench it was flawless. Torqued into its enclosure the rail collapsed. The five-minute fix everyone wanted would have silenced the board and shipped the defect.",
    artifact: "Five-field fault case",
    mission: "Chapter 14 · 9 min read",
    missionLabel: "Card the fault first",
    caution: "Treat regulatory, standards, vendor, price, and tool guidance as a 2025 snapshot."
  },
  {
    slug: "engineering-leadership",
    title: "What Decision Would You Make Differently?",
    book: "Engineering Leadership: The Hard Parts",
    authors: "Juan Pablo Buriticá & James Turnbull",
    domain: "Engineering leadership",
    payoff: "A manager published per-reviewer code-review times to find the bottleneck. The slowest reviewer started rubber-stamping. Bug escape rates tripled — his slow reviews had been catching 89% of production bugs.",
    artifact: "Six-field metric spec",
    mission: "Chapter 10 · 11 min read",
    missionLabel: "Audit one number",
    caution: "First edition, 2026; the local file is an EPUB reflow, so receipts use PDF pages and chapter/section titles with no printed-page mapping."
  },
  {
    slug: "web-hacking-arsenal",
    title: "The Bug Was Real. The Report Decided Whether It Counted.",
    book: "Web Hacking Arsenal",
    authors: "Rafay Baloch",
    domain: "Security",
    payoff: "Unauthenticated IDOR, flawless repro, closed as Informative twenty-two minutes later. Three days proving the flaw existed and zero minutes proving anyone should care.",
    artifact: "Six-line severity decision card",
    mission: "Chapter 14 · 7 min read",
    missionLabel: "Card one finding tonight",
    caution: "First edition, 2024–2025; treat CVSS version, OWASP numbering, and named tools as snapshots to check against current standards — the reporting method is the durable payoff."
  },
  {
    slug: "think-stats",
    title: "Your t-Test Returned in a Millisecond. The Last Chapter Tells You What You Bought.",
    book: "Think Stats",
    authors: "Allen B. Downey",
    domain: "Statistics",
    payoff: "The p-value came back in a millisecond and said ship it. By Monday the p99 had doubled. The formula was an optimization we had never read the preconditions on.",
    artifact: "Six-line shortcut-validity card",
    mission: "Chapter 14 · 7 min read",
    missionLabel: "Audit one column",
    caution: "Third edition, 2025, and current; the mission depends on the book's live companion notebooks and datasets on GitHub."
  }
];

export const skips = [
  {
    slug: "building-llm-powered-applications",
    book: "Building LLM Powered Applications",
    reason: "The 2023 model, framework, API, and legal stack is stale, while the late evaluation and deployment material is too shallow to support a durable destination."
  },
  {
    slug: "security-driven-software-development",
    book: "Security-Driven Software Development",
    reason: "Obsolete and unsafe examples, weak threat-to-test traceability, and a thin final validation report outweigh the useful premise."
  },
  {
    slug: "chatgpt-for-cybersecurity",
    book: "ChatGPT for Cybersecurity Cookbook",
    reason: "The capstone recipe runs on OpenAI's Assistants API, removed in August 2026, and no durable method redeems the aging: a 2024 cookbook whose scripts feed attacker-controllable data into prompts and execute the replies never once mentions prompt injection or hallucination."
  }
];
