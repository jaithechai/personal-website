export type Project = {
  id: string;
  ref: string;
  title: string;
  value: string;
  pins: [string, string];
  summary: string;
  details: string[];
  image?: { src: string; alt: string; width: number; height: number };
  diagram?: "buck" | "amplifier";
  links?: { label: string; href: string }[];
};
export const projects: Project[] = [
  {
    id: "solar-car",
    ref: "U1",
    title: "Solar Car Electrical System",
    value: "Plano Green Team · KiCad",
    pins: ["1,150 W ARRAY", "RF TELEMETRY"],
    summary:
      "Designed all 5 of the car’s circuits in KiCad over three seasons, drew the wiring diagrams, and built each: motor (HV), aux (LV), and telem + array schematics.",
    details: [
      "Designed the high-voltage system: a 1,150 W solar array and 5.2 kWh pack (52.1 V, 100 Ah) through disconnects and contactors to the motor controller and motor, routed to keep EMI out of the sensor and control lines.",
      "Sized the wire gauges and fuse ratings for the HV and LV systems from each load’s expected current draw.",
      "Built the low-voltage aux system for the lights and horn, and moved the driver’s controls onto the steering wheel with an RF-activated relay: turn signals, hazards, and horn from a wheel remote, no cable through the column.",
      "Built the Raspberry Pi telemetry hardware (sensors, wiring, RF link) measuring pack voltage, state of charge, and MPPT input power, enabling live race-strategy calls over 500 miles at Texas Motor Speedway.",
      "Placed 2nd in the Advanced Classic Division at the 2026 Solar Car Challenge, a cross-country race across Texas.",
    ],
    image: {
      src: "/work-solar-car.png",
      alt: "Plano Green Team behind its silver solar car in Victory Lane at Texas Motor Speedway, with Dilbaghi’s number 33 jersey visible.",
      width: 1584,
      height: 891,
    },
    links: [
      {
        label: "Team site",
        href: "https://sites.google.com/planogreenteam.org/steamengine/home",
      },
      {
        label: "2026 race profile",
        href: "https://www.solarcarchallenge.org/challenge/teams2026/plano.shtml",
      },
      {
        label: "Motor (HV) schematic",
        href: "https://drive.google.com/file/d/1LoMcC4LuFWDQlMB_X1OhySP1N9LrdVKc/view",
      },
      {
        label: "Aux (LV) schematic",
        href: "https://drive.google.com/file/d/1GBg13144AvpmL9xh0rvsFqjZ1SPYOtol/view",
      },
      {
        label: "Telem + array schematic",
        href: "https://drive.google.com/file/d/1QX8oDubzrSDl8R-0jVVqEw1xMpqmAyz7/view",
      },
    ],
  },
  {
    id: "buck-converter",
    ref: "U2",
    title: "Synchronous Buck Converter PCB",
    value: "KiCad · 2-layer PCB",
    pins: ["TPS2832", "CURRENT SENSE"],
    summary:
      "Designed a 2-layer synchronous buck (step-down) converter PCB around a TI TPS2832 gate driver with two power MOSFETs.",
    details: [
      "Added op-amp current sensing on a 0.5 ohm shunt and a solid ground plane; DRC-clean and ordered from JLCPCB.",
    ],
    diagram: "buck",
  },
  {
    id: "op-amp",
    ref: "U3",
    title: "Variable-Gain Op-Amp PCB",
    value: "KiCad · TLV2372",
    pins: ["BNC IN", "GAIN CONTROL"],
    summary:
      "Designed, ordered and assembled a variable-gain op-amp amplifier PCB (TLV2372, potentiometer gain control, BNC input).",
    details: [
      "Hand-soldered the surface-mount SOIC-8 with hot air and the through-hole parts with an iron.",
    ],
    diagram: "amplifier",
  },
  {
    id: "agentic-operations",
    ref: "U4",
    title: "Agentic Personal Operations System",
    value: "Claude Code · Python",
    pins: ["INBOX", "COURSEWORK"],
    summary:
      "Designed an orchestrator that runs parallel and scheduled Claude Code agents, connected to OpenAI Codex, across Gmail, Outlook, my calendar and coursework, from managing my inbox to finding internship and research opportunities for me.",
    details: [
      "Built it on multi-agent workflows, with independent reviewer agents checking each other’s work, and reverse-engineered undocumented web APIs to connect agents to services with no public integration.",
    ],
  },
  {
    id: "autonomous-driving",
    ref: "U5",
    title: "Autonomous Driving CNN",
    value: "UT Dallas · Summer 2025",
    pins: ["IMAGES", "VALIDATION"],
    summary:
      "Tuned an existing convolutional neural network with GridSearchCV, reaching 95%+ accuracy classifying autonomous-driving images.",
    details: [
      "Owned model validation: evaluated with F1-score and confusion matrices, visualized results in Seaborn, and presented the findings to faculty and graduate mentors.",
    ],
    image: {
      src: "/work-cnn.png",
      alt: "Urban traffic image with colored boxes labeling cars, a truck, a cyclist, a person, and a traffic light.",
      width: 952,
      height: 640,
    },
  },
  {
    id: "gym-form",
    ref: "U6",
    title: "Gym Form Classifier",
    value: "UT Dallas · Summer 2024",
    pins: ["LIFTING VIDEO", "INTENSITY"],
    summary:
      "Placed top 10 of 40 projects by co-developing a computer-vision gym-form classifier in Python with XGBoost, leading the experimentation, tuning, and evaluation.",
    details: [
      "Built the pipeline end to end: extracted concentric rep times from lifting video using ArUco marker tracking, combined them with lifter attributes, and classified reps-in-reserve into three intensity bands.",
    ],
    image: {
      src: "/work-gym.png",
      alt: "Reps-in-reserve chart showing hypertrophy and fatigue curves rising toward failure, with the final values circled.",
      width: 916,
      height: 834,
    },
    links: [
      {
        label: "Project repository",
        href: "https://github.com/jaithechai/UTD-AI-Internship-Project",
      },
    ],
  },
];
export const debugNote =
  "Traced a race-day throttle loss to the motor controller overheating at 180 F on telemetry, not the battery, and had the HV box ventilated with intake and exhaust holes and a fan; the car finished the race.";
export const experience = [
  {
    ref: "E1",
    role: "Electrical Lead",
    org: "Plano Green Team, Solar Car Challenge · Plano, TX",
    dates: "2024 to 2026",
    notes: [
      "Led and trained a 15-person electrical subteam of first-time members and raised $50,000+ from 30+ sponsors to fund three seasons. 4th in Nation in 2024 and 2025.",
    ],
  },
  {
    ref: "E2",
    role: "Safety Officer",
    org: "Plano Green Team · Plano, TX",
    dates: "2023 to 2024",
    notes: [],
  },
  {
    ref: "E3",
    role: "Research Intern, Machine Learning and Computer Vision",
    org: "Data-Efficient Intelligent Learning Lab, UT Dallas",
    dates: "Summer 2025",
    notes: [
      "Tuned an existing CNN and owned model validation, visualization, and presentation to faculty and graduate mentors.",
    ],
  },
  {
    ref: "E4",
    role: "Research Intern, AI/ML",
    org: "Deep-Dive AI Workshop, UT Dallas",
    dates: "Summer 2024",
    notes: [
      "Co‑developed the gym-form classifier; led experimentation, tuning, and evaluation.",
    ],
  },
  {
    ref: "E5",
    role: "STEM Instructor",
    org: "iCode School · Plano, TX",
    dates: "April 2025 to April 2026",
    notes: [
      "Wrote a one-year curriculum taking K-12 students from block coding to advanced Python and AI, plus robotics and drone labs.",
    ],
  },
  {
    ref: "E6",
    role: "Leadership",
    org: "Liberty High School",
    dates: "2023 to 2026",
    notes: [
      "Textbooks for Tomorrow (501(c)(3)), VP of Operations and Outreach: distributed 7,800+ books worth $65K across a 200+ volunteer operation.",
      "National Honor Society, Chapter President: led 380+ members to 7,700+ annual volunteer hours.",
      "Academic Decathlon, President: 3rd in Math in Texas, 2025 State Finals.",
    ],
  },
];
export const skills = [
  {
    label: "Hardware / EE",
    items:
      "KiCad schematics and PCB layout, LTspice, breadboarding, oscilloscope, multimeter, power supply, function generator, surface-mount (hot air) and through-hole soldering, wire gauge and fuse sizing, wire harnessing and crimping, EMI-aware layout",
  },
  {
    label: "Software",
    items:
      "Python, Java, Git/GitHub (branching, worktrees), Raspberry Pi 5 programming",
  },
  {
    label: "AI / Automation",
    items:
      "Claude Code, multi-agent systems, agentic workflows, parallel and scheduled agents, API reverse engineering",
  },
  {
    label: "Data / ML",
    items:
      "XGBoost, scikit-learn, GridSearchCV, Seaborn, model evaluation and visualization",
  },
];
export const awards = [
  "Solar Car Challenge: 2nd, Advanced Classic Division, 2026. 4th in Nation, Advanced Classic Division, 2025. 4th in Nation, Advanced Division, 2024.",
  "Selected for Y Combinator Startup School 2026; $25,000+ in AI and cloud credits from OpenAI, Anthropic, xAI, AWS, Azure, Cursor.",
  "UT Dallas Battle of the Brains, Advanced Division Finalist, 2025.",
  "BPA Nationals, Computer Network Tech.",
];
export const highlights = [
  "2nd in Advanced Classic 2026",
  "Y Combinator Startup School 2026",
  "95%+ CNN accuracy at UT Dallas",
];
export const education =
  "B.S. Electrical and Computer Engineering, Minor in Entrepreneurship, The University of Texas at Austin.";
export const timeline = [
  { year: "2023", change: "Joined Plano Green Team as Safety Officer." },
  {
    year: "2024",
    change:
      "Became Electrical Lead. Team placed 4th in Nation, Advanced Division. Co‑developed the gym-form classifier at the UT Dallas Deep-Dive AI Workshop.",
  },
  {
    year: "2025",
    change:
      "Researched autonomous-driving image classification at UT Dallas and began teaching at iCode School. Solar team placed 4th in Nation, Advanced Classic Division.",
  },
  {
    year: "2026",
    change:
      "Solar team placed 2nd in Advanced Classic. Selected for Y Combinator Startup School. Completed the STEM Instructor role at iCode School.",
  },
];
