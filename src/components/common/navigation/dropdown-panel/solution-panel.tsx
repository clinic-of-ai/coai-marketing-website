// solution-panel.tsx

import Link from "next/link";
import { solutions } from "@/components/common/navigation/data"; 

export default function SolutionPanel() {
  return (
    <div className="grid w-[800px] grid-cols-4 gap-6 p-6">
      <div className="col-span-1">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Job Roles</h3>
        <div className="space-y-2">
          {solutions.jobRoles.map((role, index) => (
            <Link key={index} href={role.href} className="block text-sm text-foreground hover:text-primary">
              {role.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="col-span-1">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Industries</h3>
        <div className="space-y-2">
          {solutions.industries.map((industry, index) => (
            <Link
              key={index}
              href={industry.href}
              className="flex items-center space-x-2 text-sm text-foreground hover:text-primary"
            >

              <span>{industry.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="col-span-2">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Use Cases</h3>
        <div className="grid gap-4">
          {solutions.useCases.map((useCase, index) => (
            <Link key={index} href={useCase.href} className="group grid gap-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium group-hover:text-primary">{useCase.name}</span>
              </div>
  
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
