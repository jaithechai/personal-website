import { GITHUB_URL, LINKEDIN_URL } from "./site";

export { GITHUB_URL, LINKEDIN_URL };

export const person = {
  name: "Jai Dilbaghi",
  firstName: "Jai",
  intro: [
    "I'm most interested in circuit board design, electrical systems, and machine learning. Right now I'm on Texas Speedboat Racing at UT Austin.",
  ],
  aboutIntro:
    "I'm Jai, an Electrical and Computer Engineering student at UT Austin. I want to build things that have a real-world application and can help people.",
  workIntro:
    "These are the projects and roles that best show how I work. I like hands-on problems with clear goals.",
  school: "UT Austin",
  degree: "B.S. Electrical and Computer Engineering",
  minor: "Entrepreneurship",
  tagline: "Electrical and Computer Engineering at UT Austin.",
  email: "jai.dilbaghi@gmail.com",
  handle: "jaithechai",
  linkedinHandle: "jaidilbaghi",
  headshot: "/headshot.jpg",
  headshotAlt: "Jai Dilbaghi portrait",
} as const;

// Hero side list, in site order.
export const heroFacts: string[] = [
  "ECE at UT Austin, Minor in Entrepreneurship",
  "Electrical Lead, Plano Green Team. 2nd in Advanced Classic at the 2026 Solar Car Challenge",
  "ML and computer vision research at UT Dallas",
  "Selected for Y Combinator Startup School 2026",
];

export const aboutFacts: string[] = [
  "Electrical Lead on Plano Green Team, 2024 to 2026. Safety Officer before that.",
  "Machine learning and computer vision research at UT Dallas.",
  "Led a 15-person electrical subteam and raised $50,000+ from 30+ sponsors across three seasons.",
  "B.S. Electrical and Computer Engineering, Minor in Entrepreneurship, UT Austin.",
];

export const timeline: { year: string; title: string; text: string }[] = [
  {
    year: "2023",
    title: "Joined Plano Green Team",
    text: "Started on the solar car as Safety Officer, then moved into electrical systems, telemetry, and race support.",
  },
  {
    year: "2024",
    title: "UT Dallas Deep-Dive AI Workshop",
    text: "Co-developed a computer-vision gym-form classifier in Python with XGBoost and placed top 10 of 40 projects.",
  },
  {
    year: "2024",
    title: "Solar car results",
    text: "Team finished 4th in the nation in the Advanced Division.",
  },
  {
    year: "2025",
    title: "iCode School",
    text: "Joined as a STEM Instructor and wrote a K-12 curriculum running from block coding to advanced Python and AI.",
  },
  {
    year: "2025",
    title: "UT Dallas research",
    text: "Tuned an existing CNN for autonomous-driving image classification, owned the validation, and reached 95%+ accuracy.",
  },
  {
    year: "2025",
    title: "Solar car results",
    text: "Team finished 4th in the nation in the Advanced Classic Division.",
  },
  {
    year: "2026",
    title: "2nd in Advanced Classic",
    text: "Placed 2nd in the Advanced Classic Division at the Solar Car Challenge, a cross-country race across Texas, leading the electrical subsystem through design, build, and on-road race operations.",
  },
  {
    year: "2026",
    title: "UT Austin",
    text: "Started Electrical and Computer Engineering at UT Austin.",
  },
  {
    year: "2026",
    title: "Y Combinator Startup School",
    text: "Selected for Y Combinator Startup School 2026.",
  },
];

export interface Project {
  id: string;
  name: string;
  /** At most 22 characters, for giant type. */
  shortName: string;
  org: string;
  /** Only where the site states it elsewhere (Experience entries for the same org). */
  dates: string | null;
  description: string;
  facts: string[];
  tags: string[];
  image: string | null;
  imageSize: { width: number; height: number } | null;
  links: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    id: "solar-car",
    name: "Solar Car Electrical System",
    shortName: "Solar Car Electrical",
    org: "Plano Green Team",
    dates: "2024 to 2026",
    description:
      "Designed all 5 of the car's circuits in KiCad over three seasons, drew the wiring diagrams, and built each: motor (HV), aux (LV), telemetry and array. Designed the high-voltage system from a 1,150 W solar array and 5.2 kWh pack (52.1 V, 100 Ah) through disconnects and contactors to the motor controller and motor, routed to keep EMI out of the sensor and control lines, and sized wire gauges and fuse ratings from each load's expected current draw. Built the LV aux system for lights and horn, the steering-wheel RF relay remote for turn signals, hazards and horn, and the Raspberry Pi telemetry hardware measuring pack voltage, state of charge and MPPT input power. Traced a race-day throttle loss to the motor controller overheating at 180 F, had the HV box ventilated with intake and exhaust holes and a fan, and the car finished the race.",
    facts: [
      "2nd in Advanced Classic, 2026 Solar Car Challenge",
      "$50,000+ raised from 30+ sponsors",
      "Live race-strategy data over 500 miles at Texas Motor Speedway",
    ],
    tags: [
      "KiCad",
      "HV and LV system design",
      "Wire and fuse sizing",
      "Raspberry Pi telemetry hardware",
      "RF relay",
    ],
    image: "/work-solar-car.png",
    imageSize: { width: 1584, height: 891 },
    links: [],
  },
  {
    id: "buck-converter",
    name: "Synchronous Buck Converter PCB",
    shortName: "Buck Converter PCB",
    org: "Personal project",
    dates: null,
    description:
      "Designed a 2-layer synchronous buck (step-down) converter PCB around a TI TPS2832 gate driver with two power MOSFETs. Added op-amp current sensing on a 0.5 ohm shunt and a solid ground plane; DRC-clean and ordered from JLCPCB.",
    facts: [
      "TPS2832 gate driver, two power MOSFETs",
      "Op-amp current sensing on a 0.5 ohm shunt",
      "DRC-clean, ordered from JLCPCB",
    ],
    tags: ["KiCad", "2-layer PCB", "Power electronics"],
    image: null,
    imageSize: null,
    links: [],
  },
  {
    id: "op-amp-amplifier",
    name: "Variable-Gain Op-Amp Amplifier PCB",
    shortName: "Op-Amp Amplifier PCB",
    org: "Personal project",
    dates: null,
    description:
      "Designed, ordered and assembled a variable-gain op-amp amplifier PCB (TLV2372, potentiometer gain control, BNC input). Hand-soldered the surface-mount SOIC-8 with hot air and the through-hole parts with an iron.",
    facts: [
      "TLV2372 op-amp, BNC input",
      "Potentiometer gain control",
      "Hand-assembled, SMD and through-hole",
    ],
    tags: ["KiCad", "Analog design", "Hot-air and through-hole soldering"],
    image: null,
    imageSize: null,
    links: [],
  },
  {
    id: "driving-cnn",
    name: "Autonomous Driving CNN",
    shortName: "Autonomous Driving CNN",
    org: "Data-Efficient Intelligent Learning Lab, UT Dallas",
    dates: "Summer 2025",
    description:
      "Tuned an existing convolutional neural network with GridSearchCV, reaching 95%+ accuracy classifying autonomous-driving images. Owned model validation: evaluated with F1-score and confusion matrices, visualized results in Seaborn, and presented the findings to faculty and graduate mentors.",
    facts: [
      "95%+ classification accuracy",
      "Owned validation and metrics",
      "Presented to faculty and graduate mentors",
    ],
    tags: ["Python", "scikit-learn", "GridSearchCV", "Seaborn", "Computer Vision"],
    image: "/work-cnn.png",
    imageSize: { width: 952, height: 640 },
    links: [],
  },
  {
    id: "gym-form",
    name: "Gym Form Classifier",
    shortName: "Gym Form Classifier",
    org: "Deep-Dive AI Workshop, UT Dallas",
    dates: "Summer 2024",
    description:
      "Co-developed a computer-vision gym-form classifier in Python with XGBoost, leading the experimentation, tuning, and evaluation. Built the pipeline end to end: extracted concentric rep times from lifting video using ArUco marker tracking, combined them with lifter attributes, and classified reps-in-reserve into three intensity bands. Placed top 10 of 40 projects.",
    facts: [
      "Top 10 of 40 projects",
      "ArUco-based rep-time extraction",
      "Three-band reps-in-reserve classification",
    ],
    tags: ["Python", "XGBoost", "Computer Vision"],
    image: "/work-gym.png",
    imageSize: { width: 916, height: 834 },
    links: [],
  },
  {
    id: "agentic-ops",
    name: "Agentic Personal Operations System",
    shortName: "Agentic Ops System",
    org: "Personal project",
    dates: null,
    description:
      "Designed an orchestrator that runs parallel and scheduled Claude Code agents, connected to OpenAI Codex, across Gmail, Outlook, my calendar and coursework, from managing my inbox to finding internship and research opportunities for me. Built it on multi-agent workflows, with independent reviewer agents checking each other's work, and reverse-engineered undocumented web APIs to connect agents to services with no public integration.",
    facts: [
      "Parallel and scheduled Claude Code agents",
      "Independent reviewer agents",
      "Connected to OpenAI Codex",
    ],
    tags: ["Claude Code", "Python", "Multi-agent workflows"],
    image: null,
    imageSize: null,
    links: [],
  },
];

export const experience: {
  role: string;
  org: string;
  dates: string;
  bullets: string[];
}[] = [
  {
    role: "Electrical Lead",
    dates: "2024 to 2026",
    org: "Plano Green Team, Solar Car Challenge. Safety Officer, 2023 to 2024",
    bullets: [
      "Designed all 5 of the car's circuits in KiCad across three seasons and built each one out in hardware",
      "Designed the high-voltage system: a 1,150 W solar array and 5.2 kWh pack (52.1 V, 100 Ah) through disconnects and contactors to the motor controller and motor, routed to keep EMI out of the sensor and control lines",
      "Built the LV aux system for lights and horn and the steering-wheel RF relay remote for turn signals, hazards and horn, with no cable through the column",
      "Built the Raspberry Pi telemetry hardware (sensors, wiring, RF link) measuring pack voltage, state of charge and MPPT input power, enabling live race-strategy calls over 500 miles at Texas Motor Speedway",
      "Led and trained a 15-person electrical subteam, all first-time members",
      "Raised $50,000+ from 30+ sponsors across three seasons",
    ],
  },
  {
    role: "Research Intern, Machine Learning and Computer Vision",
    dates: "Summer 2025",
    org: "Data-Efficient Intelligent Learning Lab, UT Dallas",
    bullets: [
      "Tuned an existing CNN with GridSearchCV to 95%+ accuracy on autonomous-driving images",
      "Owned model validation with F1-score, confusion matrices, and Seaborn",
      "Presented findings to faculty and graduate mentors",
    ],
  },
  {
    role: "Research Intern, AI/ML",
    dates: "Summer 2024",
    org: "Deep-Dive AI Workshop, UT Dallas",
    bullets: [
      "Co-developed a gym-form classifier in Python with XGBoost, leading the experimentation, tuning, and evaluation",
      "Extracted concentric rep times from lifting video with ArUco marker tracking",
      "Placed top 10 of 40 projects",
    ],
  },
  {
    role: "STEM Instructor",
    dates: "April 2025 to April 2026",
    org: "iCode School, Plano, TX",
    bullets: [
      "Wrote the curriculum that took K-12 students from block coding to advanced Python and AI over a single year",
      "Wrote robotics and drone labs as part of the one-year curriculum",
    ],
  },
  {
    role: "Leadership",
    dates: "2023 to 2026",
    org: "Liberty High School",
    bullets: [
      "Textbooks for Tomorrow (501(c)(3)), VP of Operations and Outreach: distributed 7,800+ books worth $65K across a 200+ volunteer operation",
      "National Honor Society, Chapter President: led 380+ members to 7,700+ annual volunteer hours",
      "Academic Decathlon, President: 3rd in Math in Texas at the 2025 State Finals",
    ],
  },
];

export const skills: { label: string; items: string[] }[] = [
  {
    label: "Hardware / EE",
    items: [
      "KiCad schematics and PCB layout",
      "LTspice",
      "breadboarding",
      "oscilloscope",
      "multimeter",
      "power supply",
      "function generator",
      "surface-mount (hot air) and through-hole soldering",
      "wire gauge and fuse sizing",
      "wire harnessing and crimping",
      "EMI-aware layout",
    ],
  },
  {
    label: "Software",
    items: [
      "Python",
      "Java",
      "Git/GitHub (branching, worktrees)",
      "Raspberry Pi 5 programming",
    ],
  },
  {
    label: "AI / Automation",
    items: [
      "Claude Code",
      "multi-agent systems",
      "agentic workflows",
      "parallel and scheduled agents",
      "API reverse engineering",
    ],
  },
  {
    label: "Data / ML",
    items: [
      "XGBoost",
      "scikit-learn",
      "GridSearchCV",
      "Seaborn",
      "model evaluation and visualization",
    ],
  },
];

export const awards: { name: string; detail: string; year: string | null }[] = [
  { name: "Solar Car Challenge", detail: "2nd, Advanced Classic Division", year: "2026" },
  { name: "Solar Car Challenge", detail: "4th in Nation, Advanced Classic Division", year: "2025" },
  { name: "Solar Car Challenge", detail: "4th in Nation, Advanced Division", year: "2024" },
  {
    name: "Y Combinator Startup School",
    detail:
      "Selected; $25,000+ in AI and cloud credits from OpenAI, Anthropic, xAI, AWS, Azure, and Cursor",
    year: "2026",
  },
  {
    name: "UT Dallas Battle of the Brains coding competition",
    detail: "Advanced Division Finalist",
    year: "2025",
  },
  { name: "BPA Nationals", detail: "Computer Network Tech", year: null },
];

export const contact = {
  heading: "Contact",
  helper:
    "Email is the easiest way to reach me. I am open to internships, research, and project work.",
  rows: [
    { label: "Email", display: "jai.dilbaghi@gmail.com", href: "mailto:jai.dilbaghi@gmail.com" },
    { label: "LinkedIn", display: "/in/jaidilbaghi", href: LINKEDIN_URL },
    { label: "GitHub", display: "/jaithechai", href: GITHUB_URL },
  ],
  form: {
    fields: [
      { name: "name", label: "Name", placeholder: "Your name" },
      { name: "email", label: "Email", placeholder: "you@example.com" },
      { name: "message", label: "Message", placeholder: "What are you building?" },
    ],
    submitLabel: "Send",
    note: "Send opens your email app with this message filled in.",
  },
  mailto: {
    to: "jai.dilbaghi@gmail.com",
    subjectTemplate: "Message from {name}",
    bodyTemplate: "{message}\n\nFrom: {name} <{email}>",
  },
};
