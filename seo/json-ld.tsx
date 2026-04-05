import { LINK } from "@/constants/links";
import { SITE } from "@/constants/site";

const JsonLdScript = ({ data }: { data: Record<string, unknown> }) => (
  <script
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    type="application/ld+json"
  />
);

export const WebsiteJsonLd = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: SITE.description,
    inLanguage: "en-US",
    name: SITE.name,
    url: SITE.url,
  };
  return <JsonLdScript data={data} />;
};

export const SoftwareSourceCodeJsonLd = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    applicationCategory: "DeveloperApplication",
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: LINK.PORTFOLIO,
    },
    codeRepository: LINK.GITHUB,
    description: SITE.description,
    isAccessibleForFree: true,
    keywords: SITE.keywords.join(", "),
    license: LINK.LICENSE,
    name: SITE.name,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "USD",
    },
    programmingLanguage: ["TypeScript", "React", "Next.js"],
    runtimePlatform: "Node.js",
    url: SITE.url,
  };
  return <JsonLdScript data={data} />;
};

export const OrganizationJsonLd = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    logo: SITE.ogImage,
    name: SITE.name,
    sameAs: [LINK.GITHUB],
    url: SITE.url,
  };
  return <JsonLdScript data={data} />;
};

export const FAQJsonLd = () => {
  const faqs = [
    {
      answer: SITE.description,
      question: `What is ${SITE.name}?`,
    },
    {
      answer:
        "Add components under registry/new-york/, list them in registry.json, run pnpm registry:build, then deploy. Users install with npx shadcn@latest add pointing at your published JSON URL.",
      question: `How do I publish components with ${SITE.name}?`,
    },
    {
      answer:
        "Yes. The project is intended to be forked or cloned; source is available on GitHub under an open license.",
      question: `Is ${SITE.name} open source?`,
    },
  ];

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
  };
  return <JsonLdScript data={data} />;
};

export const BreadcrumbJsonLd = ({
  items,
}: {
  items: { name: string; path: string }[];
}) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const pathname = item.path.startsWith("/") ? item.path : `/${item.path}`;
      return {
        "@type": "ListItem",
        item: `${SITE.url}${pathname}`,
        name: item.name,
        position: index + 1,
      };
    }),
  };
  return <JsonLdScript data={data} />;
};

export const JsonLdScripts = () => (
  <>
    <WebsiteJsonLd />
    <SoftwareSourceCodeJsonLd />
    <OrganizationJsonLd />
    <FAQJsonLd />
  </>
);
