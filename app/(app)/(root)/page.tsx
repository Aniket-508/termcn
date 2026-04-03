import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CommandBox } from "@/components/command-box";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { YourComponent } from "@/registry/new-york/your-component";
import { createPageMetadata } from "@/seo/metadata";

const title = siteConfig.name;
const { description } = siteConfig;

const installCommand = `npx shadcn@latest add ${siteConfig.url}/r/your-component.json`;

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = createPageMetadata({
  description,
  path: "/",
  title,
});

export default function IndexPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-wrapper relative">
        <div className="container flex flex-col items-center gap-8 py-20 text-center md:py-28 lg:py-36">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          <p className="max-w-2xl text-lg text-zinc-400 sm:text-xl">
            {description}
          </p>

          <CommandBox command={installCommand} />

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/docs/installation">
                Get Started
                <ArrowRightIcon className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/docs/examples/basic">View Examples</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <YourComponent className="w-full max-w-md" />
      </div>
    </section>
  );
}
