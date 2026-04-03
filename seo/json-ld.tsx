import { siteConfig, siteKeywords } from "@/lib/config"

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  )
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: siteConfig.description,
    inLanguage: "en-US",
    name: siteConfig.name,
    url: siteConfig.url,
  }
  return <JsonLdScript data={data} />
}

export function SoftwareSourceCodeJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    applicationCategory: "DeveloperApplication",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.links.github,
    },
    codeRepository: siteConfig.links.github,
    description: siteConfig.description,
    isAccessibleForFree: true,
    keywords: siteKeywords.join(", "),
    license: siteConfig.licenseUrl,
    name: siteConfig.name,
    programmingLanguage: ["TypeScript", "React", "Next.js"],
    runtimePlatform: "Node.js",
    url: siteConfig.url,
  }
  return <JsonLdScript data={data} />
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    sameAs: [siteConfig.links.github],
    url: siteConfig.url,
  }
  return <JsonLdScript data={data} />
}

export function FAQJsonLd() {
  const faqs = [
    {
      answer: siteConfig.description,
      question: `What is ${siteConfig.name}?`,
    },
    {
      answer:
        "Add components under registry/new-york/, list them in registry.json, run pnpm registry:build, then deploy. Users install with npx shadcn@latest add pointing at your published JSON URL.",
      question: `How do I publish components with ${siteConfig.name}?`,
    },
    {
      answer:
        "Yes. The project is intended to be forked or cloned; source is available on GitHub under an open license.",
      question: `Is ${siteConfig.name} open source?`,
    },
  ]

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
      name: faq.question,
    })),
  }
  return <JsonLdScript data={data} />
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[]
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const pathname = item.path.startsWith("/") ? item.path : `/${item.path}`
      return {
        "@type": "ListItem",
        item: `${siteConfig.url.replace(/\/$/, "")}${pathname}`,
        name: item.name,
        position: index + 1,
      }
    }),
  }
  return <JsonLdScript data={data} />
}

export function JsonLdScripts() {
  return (
    <>
      <WebsiteJsonLd />
      <SoftwareSourceCodeJsonLd />
      <OrganizationJsonLd />
      <FAQJsonLd />
    </>
  )
}
