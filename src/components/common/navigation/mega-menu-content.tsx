import Link from "next/link"
import {
  Activity,
  Shield,
  Users,
  Building2,
  Briefcase,
  Hospital,
  Factory,
  LineChart,
  AlertCircle,
  ShieldAlert,
  Scale,
  MessageSquare,
} from "lucide-react"

const jobRoles = [
  { name: "Red Teams", href: "#" },
  { name: "Blue Teams", href: "#" },
  { name: "Purple Teams", href: "#" },
]

const industries = [
  { name: "Government", href: "#", icon: Building2 },
  { name: "Finance", href: "#", icon: Briefcase },
  { name: "Manufacturing", href: "#", icon: Factory },
  { name: "Healthcare", href: "#", icon: Hospital },
  { name: "Consulting", href: "#", icon: LineChart },
]

const useCases = [
  {
    name: "Technical onboarding and talent retention",
    description: "Train and retain top security talent",
    href: "#",
    icon: Users,
  },
  {
    name: "Team capabilities benchmarking and gap analysis",
    description: "Assess and improve team performance",
    href: "#",
    icon: Activity,
  },
  {
    name: "Internal and external candidate assessment",
    description: "Evaluate security skills effectively",
    href: "#",
    icon: Shield,
  },
  {
    name: "Emerging threats and tactic response preparation",
    description: "Stay ahead of security threats",
    href: "#",
    icon: AlertCircle,
  },
  {
    name: "Code vulnerability and risk mitigation",
    description: "Identify and fix security issues",
    href: "#",
    icon: ShieldAlert,
  },
  {
    name: "Governance and compliance",
    description: "Meet security standards",
    href: "#",
    icon: Scale,
  },
  {
    name: "Real-time breach and crisis simulation",
    description: "Practice incident response",
    href: "#",
    icon: MessageSquare,
  },
]

export function MegaMenuContent() {
  return (
    <div className="grid w-[800px] grid-cols-4 gap-6 p-6">
      <div className="col-span-1">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Job Roles</h3>
        <div className="space-y-2">
          {jobRoles.map((role) => (
            <Link key={role.name} href={role.href} className="block text-sm text-foreground hover:text-primary">
              {role.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="col-span-1">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Industries</h3>
        <div className="space-y-2">
          {industries.map((industry) => (
            <Link
              key={industry.name}
              href={industry.href}
              className="flex items-center space-x-2 text-sm text-foreground hover:text-primary"
            >
              <industry.icon className="h-4 w-4" />
              <span>{industry.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="col-span-2">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Use Cases</h3>
        <div className="grid gap-4">
          {useCases.map((useCase) => (
            <Link key={useCase.name} href={useCase.href} className="group grid gap-1">
              <div className="flex items-center space-x-2">
                <useCase.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                <span className="text-sm font-medium group-hover:text-primary">{useCase.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{useCase.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
