export const solutions = [
  {
    name: "AI-Enterprise Engine",
    list: [
      {
        name: "AI customer voice assistant",
        href: "/ava",
        icon: "bot",
        description: "Advanced voice bot for seamless customer service interactions.",
      },
      {
        name: "Full infrastructure audit and automation",
        href: "#",
        icon: "search",
        description: "Comprehensive analysis and automation of your entire infrastructure.",
      },
      {
        name: "Machine Learning prediction models",
        href: "#",
        icon: "bot",
        description: "Advanced ML models for accurate business predictions and insights.",
      },
      {
        name: "Supply chain management optimization",
        href: "#",
        icon: "refresh-cw",
        description: "Streamline and optimize your supply chain processes with AI.",
      },
      {
        name: "AI-powered marketing campaigns",
        href: "#",
        icon: "palette",
        description: "Leverage AI to create and manage highly effective marketing campaigns.",
      },
      {
        name: "Autonomous agent groups",
        href: "#",
        icon: "users",
        description: "Deploy groups of AI agents to handle complex tasks autonomously.",
      },
      {
        name: "Predictive maintenance systems",
        href: "#",
        icon: "brain",
        description: "Implement AI-driven systems to predict and prevent equipment failures.",
      },
      {
        name: "Human-AI collaboration tools",
        href: "#",
        icon: "user-check",
        description: "Tools to enhance productivity through seamless human-AI collaboration.",
      },
    ],
  },
  {
    name: "Growth OS",
    list: [
      {
        name: "AI customer voice assistant",
        href: "/ava",
        icon: "bot",
        description: "Advanced voice bot for seamless customer service interactions.",
      },
      {
        name: "Fluid AI-powered infrastructure",
        href: "#",
        icon: "line-chart",
        description: "Adaptive AI infrastructure that scales with your business needs.",
      },
      {
        name: "Optimized sales pipeline",
        href: "#",
        icon: "message-square",
        description: "AI-driven sales pipeline optimization for maximum conversion.",
      },
      {
        name: "Integrated marketing suite",
        href: "#",
        icon: "bar-chart-3",
        description: "Comprehensive marketing tools integration powered by AI.",
      },
      {
        name: "Automated content creation",
        href: "#",
        icon: "layout-dashboard",
        description: "AI-powered system for generating high-quality content at scale.",
      },
      {
        name: "AI financial management",
        href: "#",
        icon: "user-plus",
        description: "Intelligent financial management and accounting powered by AI.",
      },
      {
        name: "Real-time KPI dashboard",
        href: "#",
        icon: "refresh-cw",
        description: "Live dashboard showcasing key performance indicators linked to your database.",
      },
      {
        name: "Automated inbound lead generation",
        href: "#",
        icon: "message-square",
        description: "AI-driven system for capturing and nurturing inbound leads.",
      },
    ],
  },
  {
    name: "Solo-Entrepreneur",
    list: [
      {
        name: "AI customer voice assistant",
        href: "/ava",
        icon: "bot",
        description: "Advanced voice bot for seamless customer service interactions.",
      },
      {
        name: "Gym Trainer website builder",
        href: "#",
        icon: "search",
        description: "Easy-to-use website builder tailored for fitness professionals.",
      },
      {
        name: "Babycare RAG-based chatbot",
        href: "#",
        icon: "bot",
        description: "Intelligent chatbot providing reliable babycare advice and support.",
      },
      {
        name: "All-in-one marketing toolkit",
        href: "#",
        icon: "refresh-cw",
        description: "Comprehensive suite of marketing tools designed for solo entrepreneurs.",
      },
      {
        name: "AI customer support assistant",
        href: "#",
        icon: "palette",
        description: "24/7 AI-powered customer support to handle inquiries and issues.",
      },
      {
        name: "Personalized content creator",
        href: "#",
        icon: "users",
        description: "AI tool for generating tailored content for your specific audience.",
      },
      {
        name: "Virtual financial advisor",
        href: "#",
        icon: "wallet",
        description: "AI-powered financial planning and management for solo businesses.",
      },
      {
        name: "Solo business analytics dashboard",
        href: "#",
        icon: "line-chart",
        description: "Customizable dashboard providing key insights for solo entrepreneurs.",
      },
      {
        name: "Automated lead nurturing system",
        href: "#",
        icon: "message-square",
        description: "AI-driven system to automatically nurture and convert leads.",
      },
    ],
  },
]

export type SolutionPanel = typeof solutions;

export const lab = [
  {
    name: "Team Upskilling",
    description: "Comprehensive educational resources for teams, schools and organizations.",
    cta: "Explore all resources",
  },
  {
    name: "Corporate Courses",
    description: "Join over 250K professionals upskilling through our corporate training programs.",
    cta: "View courses",
  },
  {
    name: "Industry Micro-CoHorts",
    description: "Specialized training for specific industries",
    list: [
      { name: "Manufacturing", href: "#" },
      { name: "Agriculture", href: "#" },
      { name: "Services", href: "#" },
      { name: "Hospitality", href: "#" },
    ],
  },
];

export type LabPanel = (typeof lab)[number];

export const navLinks = [
  { name: "The Clinic", href: "/" },
  { name: "Solutions", menu: solutions },
  { name: "Lab", menu: lab },
  { name: "Investors", href: "#" },
  { name: "Talent", href: "#" },
  { name: "Contact", href: "#" },
  { name: "About", href: "#" },
];

export type NavLink = (typeof navLinks)[number];
