export const solutions = [
  {
    name: "AI-Enterprise Engine",
    list: [
      {
        name: "AI-powered CRM",
        href: "/solutions/crm",
        icon: "bot",
        description: "Advanced voice bot for seamless customer service interactions.",
      },
      {
        name: "AI customer voice assistant",
        href: "/ava",
        icon: "bot",
        description: "Advanced voice bot for seamless customer service interactions.",
      },
      {
        name: "Full infrastructure audit and automation",
        href: "/coming-soon",
        icon: "search",
        description: "Comprehensive analysis and automation of your entire infrastructure.",
      },
      {
        name: "Machine Learning prediction models",
        href: "/coming-soon",
        icon: "bot",
        description: "Advanced ML models for accurate business predictions and insights.",
      },
      {
        name: "Supply chain management optimization",
        href: "/coming-soon",
        icon: "refresh-cw",
        description: "Streamline and optimize your supply chain processes with AI.",
      },
      {
        name: "AI-powered marketing campaigns",
        href: "/coming-soon",
        icon: "palette",
        description: "Leverage AI to create and manage highly effective marketing campaigns.",
      },
      {
        name: "Autonomous agent groups",
        href: "/coming-soon",
        icon: "users",
        description: "Deploy groups of AI agents to handle complex tasks autonomously.",
      },
      {
        name: "Predictive maintenance systems",
        href: "/coming-soon",
        icon: "brain",
        description: "Implement AI-driven systems to predict and prevent equipment failures.",
      },
      {
        name: "Human-AI collaboration tools",
        href: "/coming-soon",
        icon: "user-check",
        description: "Tools to enhance productivity through seamless human-AI collaboration.",
      },
    ],
  },
  {
    name: "Growth OS",
    list: [
      {
        name: "AI-powered CRM",
        href: "/solutions/crm",
        icon: "bot",
        description: "Advanced voice bot for seamless customer service interactions.",
      },
      {
        name: "AI customer voice assistant",
        href: "/ava",
        icon: "bot",
        description: "Advanced voice bot for seamless customer service interactions.",
      },
      {
        name: "Fluid AI-powered infrastructure",
        href: "/coming-soon",
        icon: "line-chart",
        description: "Adaptive AI infrastructure that scales with your business needs.",
      },
      {
        name: "Optimized sales pipeline",
        href: "/coming-soon",
        icon: "message-square",
        description: "AI-driven sales pipeline optimization for maximum conversion.",
      },
      {
        name: "Integrated marketing suite",
        href: "/coming-soon",
        icon: "bar-chart-3",
        description: "Comprehensive marketing tools integration powered by AI.",
      },
      {
        name: "Automated content creation",
        href: "/coming-soon",
        icon: "layout-dashboard",
        description: "AI-powered system for generating high-quality content at scale.",
      },
      {
        name: "AI financial management",
        href: "/coming-soon",
        icon: "user-plus",
        description: "Intelligent financial management and accounting powered by AI.",
      },
      {
        name: "Real-time KPI dashboard",
        href: "/coming-soon",
        icon: "refresh-cw",
        description: "Live dashboard showcasing key performance indicators linked to your database.",
      },
      {
        name: "Automated inbound lead generation",
        href: "/coming-soon",
        icon: "message-square",
        description: "AI-driven system for capturing and nurturing inbound leads.",
      },
    ],
  },
  {
    name: "Solo-Entrepreneur",
    list: [
      {
        name: "AI-powered CRM",
        href: "/solutions/crm",
        icon: "bot",
        description: "Advanced voice bot for seamless customer service interactions.",
      },
      {
        name: "AI customer voice assistant",
        href: "/ava",
        icon: "bot",
        description: "Advanced voice bot for seamless customer service interactions.",
      },
      {
        name: "Gym Trainer website builder",
        href: "/coming-soon",
        icon: "search",
        description: "Easy-to-use website builder tailored for fitness professionals.",
      },
      {
        name: "Babycare RAG-based chatbot",
        href: "/coming-soon",
        icon: "bot",
        description: "Intelligent chatbot providing reliable babycare advice and support.",
      },
      {
        name: "All-in-one marketing toolkit",
        href: "/coming-soon",
        icon: "refresh-cw",
        description: "Comprehensive suite of marketing tools designed for solo entrepreneurs.",
      },
      {
        name: "AI customer support assistant",
        href: "/coming-soon",
        icon: "palette",
        description: "24/7 AI-powered customer support to handle inquiries and issues.",
      },
      {
        name: "Personalized content creator",
        href: "/coming-soon",
        icon: "users",
        description: "AI tool for generating tailored content for your specific audience.",
      },
      {
        name: "Virtual financial advisor",
        href: "/coming-soon",
        icon: "wallet",
        description: "AI-powered financial planning and management for solo businesses.",
      },
      {
        name: "Solo business analytics dashboard",
        href: "/coming-soon",
        icon: "line-chart",
        description: "Customizable dashboard providing key insights for solo entrepreneurs.",
      },
      {
        name: "Automated lead nurturing system",
        href: "/coming-soon",
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
    href: "/coming-soon",
  },
  {
    name: "AI R&D Labs",
    description: "Pioneering AI research and development for next-generation business solutions.",
    cta: "View all labs",
    href: "/ai-labs",
  },
  {
    name: "Industry Micro-CoHorts",
    description: "Specialized training for specific industries",
    list: [
      { name: "Manufacturing", href: "/coming-soon" },
      { name: "Agriculture", href: "/coming-soon" },
      { name: "Services", href: "/coming-soon" },
      { name: "Hospitality", href: "/coming-soon" },
    ],
  },
];

export type LabPanel = (typeof lab)[number];

export const navLinks = [
  { name: "The Clinic", href: "/" },
  { name: "Solutions", menu: solutions },
  { name: "Lab", menu: lab },
  { name: "Investors", href: "/coming-soon" },
  { name: "Talent", href: "/coming-soon" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
  { name: 'Video Platform', href: "/coming-soon" },
];

export type NavLink = (typeof navLinks)[number];
