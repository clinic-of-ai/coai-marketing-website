/* eslint-disable import/no-anonymous-default-export */
import { ClipboardIcon  } from '@/components/icons/solution-icons';
import { 
  PenLine,
  Brain, 
  Zap, 
  Shield,
  Settings,
  BarChart2, 
  Smartphone, 
  FileCheck 
} from 'lucide-react';

export interface Feature {
  icon: typeof ClipboardIcon;
  title: string;
  paragraph: string;
  iconBgColor: string;
  iconColor: string;
}

export default {
  hero: {
      title: "Ladia CRM Platform",
      heading: "The All-In-One CRM Built for Growth-Focused Teams",
      paragraph: "Ditch clunky CRM setups. Ladia  combines sales automation, client management, and team collaboration in one intuitive platform. Start converting leads faster tomorrow.",
      imageSrc: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67971a3c4f0aeb52025cbb54.webp"
  },
  solutionOverview: {
      title: "Why Ladia?",
      heading: "More Than CRM - Your Revenue Growth Engine",
      paragraph: "Ladia's unified platform eliminates tool sprawl while delivering enterprise-grade capabilities:",
      features: [
        {
          icon: PenLine,
          heading: "Smart Pipelines",
          paragraph: "Visual deal flows with AI-powered next-step guidance",
          iconBgColor: "bg-blue-100",
          iconColor: "text-blue-600"
        },
        {
          icon: Brain,
          heading: "AI Assistant",
          paragraph: "Automated lead scoring, email drafting, & meeting prep",
          iconBgColor: "bg-green-100",
          iconColor: "text-green-600"
        },
        {
          icon: Zap,
          heading: "Live Sync",
          paragraph: "Bi-directional sync with 50+ marketing tools",
          iconBgColor: "bg-purple-100",
          iconColor: "text-purple-600"
        },
        {
          icon: Shield,
          heading: "Built Security",
          paragraph: "SOC2 compliance & granular access controls",
          iconBgColor: "bg-orange-100",
          iconColor: "text-orange-600"
        }
      ]
  },
  benefits: {
      title: "Results",
      heading: "What Ladia Users Gain in 30 Days",
      paragraph: "Average outcomes reported by Ladia customers:",
      benefits: [
        { title: "4.7x ROI on CRM investment" },
        { title: "63% faster deal closure" },
        { title: "18hr/month saved per rep" },
        { title: "91% team adoption rate" },
        { title: "360° customer visibility" },
        { title: "24/7 priority support" }
      ]
  },
  howItWorks: {
      title: "Getting Started",
      heading: "From Signup to Revenue in 48 Hours",
      features: [
        {
          number: "01",
          heading: "Instant Setup",
          paragraph: "Pre-built templates for your industry",
        },
        {
          number: "02",
          heading: "Customize",
          paragraph: "Drag-and-drop pipeline builder",
        },
        {
          number: "03",
          heading: "Connect",
          paragraph: "Integrate your existing stack",
        },
        {
          number: "04",
          heading: "Scale",
          paragraph: "Add teams/clients with single click",
        },
      ],
  },
  features: {
      title: "Core Capabilities",
      heading: "Everything You Need - Nothing You Don't",
      items: [
        {
          icon: Settings,
          heading: "Workflow Builder",
          paragraph: "Create complex automations without coding"
        },
        {
          icon: BarChart2,
          heading: "Executive Views",
          paragraph: "Real-time revenue dashboards & forecasts"
        },
        {
          icon: Smartphone,
          heading: "Field Ready",
          paragraph: "Full mobile CRM with offline access"
        },
        {
          icon: FileCheck,
          heading: "Audit Trail",
          paragraph: "Complete GDPR/CCPA compliance toolkit"
        }
      ]
  },
  testimonials: {
      quotes: [
        {
          id: 1,
          quote: "Switched from Salesforce to Ladia and saw 40% cost savings with better functionality. Our reps actually enjoy using it!",
          author: {
            name: "Emma Wilson",
            title: "VP Sales, TechScale",
            avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/679716e664e3cc38eaf1cee9.jpeg",
          },
        },
        {
          id: 2,
          quote: "Ladia's AI suggestions helped us identify 18% more upsell opportunities in Q1. Game changer.",
          author: {
            name: "Diego Martinez",
            title: "Growth Lead, SaaS.co",
            avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/679716ef64e3cc28e9f1ceec.webp",
          },
        },
        {
          id: 3,
          quote: "The automation capabilities have transformed our sales process. We're closing deals 30% faster now.",
          author: {
            name: "Sarah Chen",
            title: "Sales Director, CloudTech",
            avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/679716f864e3ccf551f1cf04.webp",
          },
        },
        {
          id: 4,
          quote: "Best customer support I've experienced. Issues get resolved in minutes, not days.",
          author: {
            name: "Michael Brown",
            title: "Operations Manager, GrowthCo",
            avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/679717086a58c4133e20b375.webp",
          },
        },
        {
          id: 5,
          quote: "The mobile app is a game-changer for our field sales team. Everything syncs perfectly.",
          author: {
            name: "Lisa Rodriguez",
            title: "Field Sales Lead, Enterprise Solutions",
            avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67971716c21e3785eabb9cb5.webp",
          },
        },
        {
          id: 6,
          quote: "Integration with our marketing tools was seamless. Finally, a truly unified view of our pipeline.",
          author: {
            name: "James Kim",
            title: "Marketing Director, B2B Solutions",
            avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/6797171f6a58c46a9820b382.jpeg",
          },
        },
        {
          id: 7,
          quote: "The analytics dashboards give us insights we never had before. Revenue forecasting is now spot-on.",
          author: {
            name: "Rachel Thompson",
            title: "Revenue Officer, SalesPro",
            avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/679717286a58c4045e20b386.jpeg",
          },
        },
        {
          id: 8,
          quote: "Onboarding new team members takes hours instead of weeks. The interface is incredibly intuitive.",
          author: {
            name: "David Patel",
            title: "Training Manager, ScaleUp Inc",
            avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67971730c21e3746ffbb9cc5.jpeg",
          },
        },
        {
          id: 9,
          quote: "The compliance features saved us months of work. GDPR certification was a breeze.",
          author: {
            name: "Sophie Anderson",
            title: "Compliance Head, DataSec",
            avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/6797174ec21e37ccf0bb9ccf.jpeg",
          },
        },
        {
          id: 10,
          quote: "ROI was evident within the first month. Our conversion rate is up 25% since implementing Ladia.",
          author: {
            name: "Alex Foster",
            title: "CEO, GrowthMetrics",
            avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67971780c21e375bbdbb9ce5.jpeg",
          },
        }
      ]
  },
  outro: {
      title: "Ready to Modernize Your CRM?",
      description: "Join 2,300+ teams accelerating growth with Ladia:",
      contactButton: "Start Free Trial",
      images: [
        { src: "/ladia-mobile-view.jpg", alt: "Mobile CRM", width: 800, height: 600 },
        { src: "/ladia-analytics.jpg", alt: "Analytics Dashboard", width: 800, height: 600 },
        { src: "/ladia-automation.jpg", alt: "Workflow Builder", width: 800, height: 600 }
      ],
      stats: [
        { number: "99.9%", label: "Uptime SLA" },
        { number: "4.8/5", label: "User Rating" },
        { number: "47s", label: "Avg. Support Response" }
      ]
  },
  pricingCta: {
      title: "Pricing",
      heading: "Simple Pricing, Enterprise Power",
      description: "Start free then grow with usage-based plans. Unlimited seats included. Cancel anytime.",
      buttonText: "Compare Plans"
  }
};