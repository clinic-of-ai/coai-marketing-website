

import Link from "next/link";
import { resources } from "@/components/common/navigation/data"; 

export default function ResourcePanel() {
  return (
    <div className="grid w-[800px] grid-cols-4 gap-6 p-6">
      <div className="col-span-1">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Job Roles</h3>
        <div className="space-y-2">
          {resources.jobRoles.map((role, index) => (
            <Link key={index} href={role.href} className="block text-sm text-foreground hover:text-primary">
              {role.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="col-span-1">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Industries</h3>
        <div className="space-y-2">
          {resources.industries.map((industry, index) => (
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
          {resources.useCases.map((useCase, index) => (
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
