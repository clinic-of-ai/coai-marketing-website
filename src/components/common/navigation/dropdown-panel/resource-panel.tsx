

import Link from "next/link";
import { resources } from "@/components/common/navigation/data"; 

export default function ResourcePanel() {
  return (
    <div className="grid w-[800px] grid-cols-3 gap-6 p-6">
       <div className="col-span-1 border-r-2 border-gray pr-6">
      <h3 className="mb-4 text-[12px] font-medium text-muted-foreground text-center">Job Roles</h3>
        <div className="space-y-2">
          {resources.jobRoles.map((role, index) => (
            <Link key={index} href={role.href}   className="block text-sm text-foreground hover:bg-secondary py-2 px-4 text-center rounded-lg">
              {role.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="col-span-1 border-r-2 border-gray pr-6">
      <h3 className="mb-4 text-[12px] font-medium text-muted-foreground text-center">Industries</h3>
        <div className="space-y-2">
          {resources.industries.map((industry, index) => (
            <Link
              key={index}
              href={industry.href}
                className="block text-sm text-foreground hover:bg-secondary py-2 px-4 text-center rounded-lg"
            >

              <span>{industry.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="col-span-1 pr-6">
        <h3 className="mb-4 text-[12px] font-medium text-muted-foreground text-center">Use Cases</h3>
        <div className="space-y-2">
          {resources.useCases.map((industry, index) => (
            <Link
              key={index}
              href={industry.href}
              className="block text-sm text-foreground hover:bg-secondary py-2 px-4 text-center rounded-lg"
            >
              <span>{industry.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

