interface ContactFormSectionProps {
  heading: string;
  paragraph: string;
  form: React.ReactNode;
}

export function ContactFormSection(props: ContactFormSectionProps) {
  return (
    <section className="bg-inverse text-inverse-foreground">
      <div className="isolate px-6 py-24 pt-48 sm:py-32 lg:px-8">
        <div className="space-y-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-bold tracking-tight sm:text-3xl">
              {props.heading}
            </h2>
            <p className="mx-auto mt-2 max-w-[460px] text-sm leading-6 text-muted-foreground">
              {props.paragraph}
            </p>
          </div>

          <div className="mx-auto max-w-xl">{props.form}</div>
        </div>
      </div>
    </section>
  );
}
