import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { ExamplePreview } from "@/components/example-preview";
import { TerminalPreview } from "@/components/terminal-preview";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

export const dynamic = "force-static";
export const revalidate = false;

const showcaseItems = [
  {
    className: "md:col-span-2 lg:row-span-2",
    name: "table-demo",
    title: "Table",
  },
  {
    name: "badge-demo",
    rows: 6,
    title: "Badge",
  },
  {
    name: "spinner-demo",
    rows: 6,
    title: "Spinner",
  },
  {
    name: "bar-chart-demo",
    rows: 10,
    title: "Bar Chart",
  },
  {
    name: "alert-demo",
    rows: 10,
    title: "Alert",
  },
  {
    name: "tool-call-demo",
    rows: 10,
    title: "Tool Call",
  },
];

export default function IndexPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <section className="relative overflow-hidden">
        <div className="container-wrapper relative">
          <div className="container flex flex-col items-center gap-4 py-16 text-center md:py-20 lg:py-24">
            <h1 className="max-w-7xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl from-foreground via-foreground to-foreground/65 bg-linear-to-b bg-clip-text text-transparent">
              Beautiful terminal UIs, made simple
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Ready to use, customizable terminal components for React.
              <br className="hidden sm:block" />
              Built on Ink. Distributed via shadcn.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <Button asChild size="lg">
                <Link href={ROUTES.DOCS_GET_STARTED}>
                  Get Started
                  <ArrowRightIcon className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`${ROUTES.DOCS_COMPONENTS}/typography/badge`}>
                  Browse Components
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wrapper pb-8 lg:pb-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {showcaseItems.map((item) => (
              <div key={item.name} className={cn(item.className)}>
                <TerminalPreview
                  className="mt-0 h-full"
                  title={item.title}
                  rows={item.rows}
                >
                  <ExamplePreview name={item.name} />
                </TerminalPreview>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
