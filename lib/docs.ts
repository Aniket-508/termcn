export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface DocsConfig {
  sidebarNav: NavItemWithChildren[];
}

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      items: [
        {
          href: "/docs",
          items: [],
          title: "Introduction",
        },
        {
          href: "/docs/installation",
          items: [],
          title: "Installation",
        },
      ],
      title: "Getting Started",
    },
    {
      items: [
        {
          href: "/docs/examples/basic",
          items: [],
          title: "Basic Usage",
        },
      ],
      title: "Examples",
    },
  ],
};
