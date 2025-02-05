"use client";

import { useState } from "react";
import { LabPanel as LabPanelType } from "@/constants/nav-links";

export function LabsPanel(props: { content: LabPanelType[] }) {
  const [] = useState([]);

  return (
    <div className="grid w-[900px] grid-cols-3 gap-4 p-6">

    </div>
  )
}

// import {
//   ArrowRight,
//   Briefcase,
//   LineChartIcon as ChartLineUp,
//   FileCheck,
//   Shield,
//   AlertTriangle,
//   Scale,
//   MessageSquare,
// } from "lucide-react"
// import Link from "next/link"

// export default function NavigationMenu() {
//   return (
//     <div className="min-h-screen bg-[#0D1117] text-white p-8">
//       <div className="flex flex-col md:flex-row justify-between gap-12 max-w-7xl mx-auto">
//         {/* Industries Column */}
//         <div className="md:w-1/4 space-y-6">
//           <h2 className="text-gray-400 text-sm font-medium mb-4">Industries</h2>
//           <div className="space-y-1">
//             <Link
//               href="#"
//               className="group flex items-center justify-between text-white hover:text-white hover:bg-gray-800 transition-colors px-3 py-2 rounded-md"
//             >
//               <span>Government</span>
//               <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
//             </Link>
//             <Link
//               href="#"
//               className="group flex items-center justify-between text-white hover:text-white hover:bg-gray-800 transition-colors px-3 py-2 rounded-md"
//             >
//               <span>Finance</span>
//               <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
//             </Link>
//             <Link
//               href="#"
//               className="group flex items-center justify-between text-white hover:text-white hover:bg-gray-800 transition-colors px-3 py-2 rounded-md"
//             >
//               <span>Manufacturing</span>
//               <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
//             </Link>
//             <Link
//               href="#"
//               className="group flex items-center justify-between text-white hover:text-white hover:bg-gray-800 transition-colors px-3 py-2 rounded-md"
//             >
//               <span>Healthcare</span>
//               <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
//             </Link>
//             <Link
//               href="#"
//               className="group flex items-center justify-between text-white hover:text-white hover:bg-gray-800 transition-colors px-3 py-2 rounded-md"
//             >
//               <span>Consulting</span>
//               <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
//             </Link>
//           </div>
//         </div>

//         {/* Separator */}
//         <div className="hidden md:block w-px bg-gray-700 self-stretch" />

//         {/* Use Cases Column */}
//         <div className="md:w-2/4 space-y-6">
//           <h2 className="text-gray-400 text-sm font-medium mb-4">Use Cases</h2>
//           <div className="space-y-4">
//             <Link href="#" className="flex items-center gap-3 text-white hover:text-gray-300 transition-colors">
//               <Briefcase className="w-5 h-5" />
//               <span>Technical onboarding and talent retention</span>
//             </Link>
//             <Link href="#" className="flex items-center gap-3 text-white hover:text-gray-300 transition-colors">
//               <ChartLineUp className="w-5 h-5" />
//               <span>Team capabilities benchmarking and gap analysis</span>
//             </Link>
//             <Link href="#" className="flex items-center gap-3 text-white hover:text-gray-300 transition-colors">
//               <FileCheck className="w-5 h-5" />
//               <span>Internal and external candidate assessment</span>
//             </Link>
//             <Link href="#" className="flex items-center gap-3 text-white hover:text-gray-300 transition-colors">
//               <AlertTriangle className="w-5 h-5" />
//               <span>Emerging threats and tactic response preparation</span>
//             </Link>
//             <Link href="#" className="flex items-center gap-3 text-white hover:text-gray-300 transition-colors">
//               <Shield className="w-5 h-5" />
//               <span>Code vulnerability and risk mitigation</span>
//             </Link>
//             <Link href="#" className="flex items-center gap-3 text-white hover:text-gray-300 transition-colors">
//               <Scale className="w-5 h-5" />
//               <span>Governance and compliance</span>
//             </Link>
//             <Link href="#" className="flex items-center gap-3 text-white hover:text-gray-300 transition-colors">
//               <MessageSquare className="w-5 h-5" />
//               <span>Real-time breach and crisis simulation</span>
//             </Link>
//           </div>
//         </div>

//         {/* Separator */}
//         <div className="hidden md:block w-px bg-gray-700 self-stretch" />

//         {/* Customer Stories Column */}
//         <div className="md:w-1/4 space-y-6">
//           <h2 className="text-gray-400 text-sm font-medium mb-4">Customer Stories</h2>
//           <div className="space-y-4">
//             <img
//               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-05%20174434-RfoJ6znKLggYnzHNQbErR1MHbjoJzz.png"
//               alt="Toyota & Hack The Box case study"
//               className="w-full h-48 object-cover rounded-lg"
//             />
//             <h3 className="text-xl font-medium leading-tight">
//               Toyota & Hack The Box: bridge the knowledge gap between security and cloud.
//             </h3>
//             <Link
//               href="#"
//               className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
//             >
//               View all customer stories
//               <ArrowRight className="ml-2 w-4 h-4" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

