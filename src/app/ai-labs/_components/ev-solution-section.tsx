import Link from "next/link"
import Image from "next/image"

interface EVSolutionsSectionProps {
    title: string
    ctaText: string
    sections: {
      title: string
      description: string
    }[]
    fundedSolution: {
      title: string
      description: string
    }
    contactText: {
      prefix: string
      suffix: string
    }
    image: {
      src: string
      alt: string
    }
  }

export function EVSolutionsSection(props: EVSolutionsSectionProps) {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">{props.title}</h2>

          <Link
            href="/contact"
            className="inline-block text-lg border-b border-black hover:border-gray-500 transition-colors"
          >
            {props.ctaText}
          </Link>

          <div className="space-y-6">
            {props.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-medium">{section.title}</h3>
                <p className="text-gray-600 leading-relaxed">{section.description}</p>
              </div>
            ))}

            <div className="space-y-4">
              <h3 className="text-xl font-medium">{props.fundedSolution.title}</h3>
              <p className="text-gray-600 leading-relaxed">{props.fundedSolution.description}</p>
            </div>

            <Link href="/contact" className="inline-flex items-center text-lg hover:text-gray-600 transition-colors">
              <span className="border-b border-current">{props.contactText.prefix}</span>
              <span className="text-gray-600"> {props.contactText.suffix}</span>
            </Link>
          </div>
        </div>

        <div className="relative h-[600px] md:h-[700px]">
          <Image
            src={props.image.src || "/placeholder.svg"}
            alt={props.image.alt}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  )
}

