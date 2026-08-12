export const essays = [
  {
    slug: "software-architecture-hard-parts",
    title: "The Architecture Decision Hidden Behind the Technology Argument",
    book: "Software Architecture: The Hard Parts",
    authors: "Neal Ford, Mark Richards, Pramod Sadalage & Zhamak Dehghani",
    domain: "Architecture",
    payoff: "Turn a technology argument into a contextual decision that developers, operators, and stakeholders can test.",
    artifact: "Five-row trade-off table",
    mission: "PDF pages 417–434",
    caution: "Product examples reflect 2021; the decision method is intentionally tool-independent.",
    recommended: true
  },
  {
    slug: "machine-learning-engineering",
    title: "The Model Is Allowed to Be Wrong. The System Is Not Allowed to Be Helpless.",
    book: "Machine Learning Engineering",
    authors: "Andriy Burkov",
    domain: "ML systems",
    payoff: "Design a failure envelope around uncertain predictions with fallbacks, undo, observation, and rollback.",
    artifact: "Five-field failure-envelope note",
    mission: "PDF pages 253–258",
    caution: "The source is a 2020 draft; treat tools as historical and the systems argument as the payoff."
  },
  {
    slug: "staff-engineers-path",
    title: "The Staff Engineer Who Can Leave the Room",
    book: "The Staff Engineer’s Path",
    authors: "Tanya Reilly",
    domain: "Engineering leadership",
    payoff: "Make good judgment travel through people and systems instead of accumulating demand around one expert.",
    artifact: "One transfer experiment",
    mission: "PDF pages 275–279 and 298–305",
    caution: "Organizational examples are snapshots; the influence model is the durable destination."
  },
  {
    slug: "refactoring-to-rust",
    title: "The Migration Unit Is a Seam, Not a Codebase",
    book: "Refactoring to Rust",
    authors: "Lily Mara & Joel Holmes",
    domain: "Migration",
    payoff: "Replace risky behavior behind a small contract that can be compared, measured, deployed, and reversed.",
    artifact: "Six-field seam card",
    mission: "PDF pages 282–290",
    caution: "The final WebAssembly recipe has aged; read it for boundary design, not copy-paste setup."
  },
  {
    slug: "practical-systems-programming-go",
    title: "A File Indexer Is a Chain of Promises",
    book: "Practical Systems Programming in Go",
    authors: "Mihalis Tsoukalos",
    domain: "Systems programming",
    payoff: "Audit the guarantees at each boundary between filesystem, wire, journal, memory, and response.",
    artifact: "Three-row guarantee ledger",
    mission: "PDF pages 545–551",
    caution: "The project is current and instructive, but several shown error paths do not earn their claimed guarantee."
  },
  {
    slug: "database-internals",
    title: "The Database Committed. Your Client Timed Out. Both Are True.",
    book: "Database Internals",
    authors: "Alex Petrov",
    domain: "Distributed systems",
    payoff: "Separate the state of a replicated system from the evidence available to a timed-out client.",
    artifact: "Five-moment knowledge ledger",
    mission: "PDF pages 299–312",
    caution: "This is the first 2019 release; one local Paxos sentence is explicitly corrected in the essay."
  },
  {
    slug: "defending-apis",
    title: "API Security Is a Coverage System, Not a Product Purchase",
    book: "Defending APIs",
    authors: "Colin Domoney",
    domain: "Security",
    payoff: "Connect known APIs, explicit owners, design, testing, runtime evidence, and governance into one coverage chain.",
    artifact: "One-API coverage card",
    mission: "PDF pages 352–356",
    caution: "Use the lifecycle model; verify OAuth, OWASP numbering, frameworks, and products against current sources."
  },
  {
    slug: "learning-systems-thinking",
    title: "The Mission Stayed the Same. Every Word Changed.",
    book: "Learning Systems Thinking",
    authors: "Diana Montalion",
    domain: "Systems thinking",
    payoff: "Expose semantic drift before newer components rebuild an obsolete definition of the system.",
    artifact: "Six-row purpose-word ledger",
    mission: "PDF pages 515–527",
    caution: "The local PDF is an EPUB reflow, so receipts use physical PDF pages and no printed-page mapping."
  },
  {
    slug: "performance-analysis-tuning-modern-cpus",
    title: "The Fifth Thread Made the Program Slower",
    book: "Performance Analysis and Tuning on Modern CPUs",
    authors: "Denis Bakhvalov",
    domain: "Performance",
    payoff: "Read a reversing scaling curve as evidence of serial work, waiting, oversubscription, or cache-line traffic.",
    artifact: "Four-row thread-count autopsy",
    mission: "PDF pages 147–160",
    caution: "Prefer the expanded 2024 second edition; exact 2020 tool commands and event names are snapshots."
  },
  {
    slug: "efficient-cloud-finops",
    title: "A Discount Can Fossilize Waste",
    book: "Efficient Cloud FinOps",
    authors: "Alfonso San Miguel Sánchez & Danny Obando García",
    domain: "Cloud economics",
    payoff: "Stabilize purpose, architecture, usage, and schedule before committing to a cheaper rate.",
    artifact: "Five-row optimization ledger",
    mission: "PDF pages 366–380",
    caution: "Prices, SKUs, licensing, and provider architectures are historical; the ordering rule is the payoff."
  },
  {
    slug: "designing-electronics-that-work",
    title: "The Enclosure Did Not Cause the Failure. It Exposed It.",
    book: "Designing Electronics That Work",
    authors: "Hunter Scott",
    domain: "Electronics",
    payoff: "Distinguish a latent physical defect from the condition that merely makes it appear.",
    artifact: "Five-field fault case",
    mission: "PDF pages 315–321",
    caution: "Treat regulatory, standards, vendor, price, and tool guidance as a 2025 snapshot."
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
  }
];
