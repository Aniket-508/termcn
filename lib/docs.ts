import { ROUTES } from "@/constants/routes";
import type { ExampleFramework } from "@/lib/examples";

import { formatLabelFromSlug } from "./utils";

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

const TITLE_OVERRIDES: Record<string, string> = {
  ink: "Ink",
  json: "JSON",
  opentui: "OpenTUI",
  "qr-code": "QR Code",
};

export const DOCS_FRAMEWORKS = ["ink", "opentui"] as const;
export const DEFAULT_DOCS_FRAMEWORK: ExampleFramework = "ink";

export const formatTitleFromSlug = (slug: string): string =>
  TITLE_OVERRIDES[slug] ?? formatLabelFromSlug(slug);

export const isDocsFramework = (
  value: string | undefined
): value is ExampleFramework =>
  value !== undefined && (DOCS_FRAMEWORKS as readonly string[]).includes(value);

export const hasDocsFrameworkInSlug = (slug?: string[]) =>
  slug?.[0] === "components" && isDocsFramework(slug?.[1]);

export const getDocsFrameworkFromSlug = (slug?: string[]): ExampleFramework =>
  slug?.[0] === "components" && isDocsFramework(slug?.[1])
    ? slug[1]
    : DEFAULT_DOCS_FRAMEWORK;

export const stripDocsFrameworkFromSlug = (slug?: string[]) => {
  if (slug?.[0] !== "components" || !isDocsFramework(slug?.[1])) {
    return slug;
  }

  return ["components", ...slug.slice(2)];
};

export const isComponentDocsSlug = (slug?: string[]) => {
  const contentSlug = stripDocsFrameworkFromSlug(slug);

  return contentSlug?.[0] === "components" && contentSlug.length >= 3;
};

export const getDocsRouteSlug = (
  slug: string[] | undefined,
  framework: ExampleFramework = DEFAULT_DOCS_FRAMEWORK
) => {
  const contentSlug = stripDocsFrameworkFromSlug(slug);

  if (!contentSlug || !isComponentDocsSlug(contentSlug)) {
    return contentSlug;
  }

  return ["components", framework, ...contentSlug.slice(1)];
};

export const getDocsRoute = (
  slug: string[] | undefined,
  framework: ExampleFramework = DEFAULT_DOCS_FRAMEWORK
) => {
  const routeSlug = getDocsRouteSlug(slug, framework);

  return routeSlug?.length
    ? `${ROUTES.DOCS}/${routeSlug.join("/")}`
    : ROUTES.DOCS;
};

const navLeaf = (
  title: string,
  href: string
): NavItemWithChildren["items"][number] => ({
  href,
  items: [],
  title,
});

const buildSection = (
  title: string,
  href: string,
  folder: string,
  slugs: readonly string[]
): NavItemWithChildren => ({
  href: `${href}/${folder}`,
  items: slugs.map((slug) =>
    navLeaf(formatLabelFromSlug(slug), `${href}/${folder}/${slug}`)
  ),
  title,
});

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      items: [
        navLeaf("Introduction", ROUTES.DOCS),
        navLeaf("Installation", ROUTES.DOCS_INSTALLATION),
        navLeaf("Components", ROUTES.DOCS_COMPONENTS),
        navLeaf("Templates", ROUTES.DOCS_TEMPLATES),
        navLeaf("Theming", ROUTES.DOCS_THEMING),
        navLeaf("MCP", ROUTES.DOCS_MCP),
        navLeaf("Registry", ROUTES.DOCS_REGISTRY),
        // navLeaf("Changelog", ROUTES.DOCS_CHANGELOG),
        navLeaf("llms.txt", ROUTES.LLMS),
      ],
      title: "Overview",
    },
    buildSection("Themes", ROUTES.DOCS, "themes", [
      "default",
      "dracula",
      "nord",
      "catppuccin",
      "monokai",
      "solarized",
      "tokyo-night",
      "one-dark",
      "high-contrast",
    ]),
    buildSection("Layout", ROUTES.DOCS_COMPONENTS, "layout", [
      "aspect-ratio",
      "box",
      "center",
      "columns",
      "divider",
      "grid",
      "scroll-view",
      "spacer",
      "stack",
    ]),
    buildSection("Typography", ROUTES.DOCS_COMPONENTS, "typography", [
      "badge",
      "big-text",
      "code",
      "digits",
      "gradient",
      "heading",
      "link",
      "markdown",
      "tag",
    ]),
    buildSection("Input", ROUTES.DOCS_COMPONENTS, "input", [
      "email-input",
      "masked-input",
      "number-input",
      "password-input",
      "path-input",
      "search-input",
      "text-area",
      "text-input",
    ]),
    buildSection("Selection", ROUTES.DOCS_COMPONENTS, "selection", [
      "checkbox",
      "checkbox-group",
      "color-picker",
      "multi-select",
      "radio-group",
      "select",
      "tag-input",
      "tree-select",
    ]),
    buildSection("Data", ROUTES.DOCS_COMPONENTS, "data", [
      "card",
      "data-grid",
      "definition",
      "diff-view",
      "directory-tree",
      "git-status",
      "json",
      "key-value",
      "list",
      "table",
      "tree",
      "virtual-list",
    ]),
    buildSection("Feedback", ROUTES.DOCS_COMPONENTS, "feedback", [
      "alert",
      "banner",
      "multi-progress",
      "progress-bar",
      "progress-circle",
      "skeleton",
      "spinner",
      "status-message",
      "toast",
    ]),
    buildSection("Navigation", ROUTES.DOCS_COMPONENTS, "navigation", [
      "breadcrumb",
      "command-palette",
      "menu",
      "pagination",
      "sidebar",
      "tabbed-content",
      "tabs",
    ]),
    buildSection("Overlays", ROUTES.DOCS_COMPONENTS, "overlays", [
      "dialog",
      "drawer",
      "modal",
      "notification-center",
      "popover",
      "tooltip",
    ]),
    buildSection("Forms", ROUTES.DOCS_COMPONENTS, "forms", [
      "confirm",
      "date-picker",
      "file-picker",
      "form",
      "form-field",
      "time-picker",
      "wizard",
    ]),
    buildSection("Utility", ROUTES.DOCS_COMPONENTS, "utility", [
      "clipboard",
      "clock",
      "embedded-terminal",
      "error-boundary",
      "help",
      "image",
      "keyboard-shortcuts",
      "log",
      "panel",
      "qr-code",
      "stopwatch",
      "timer",
      "toggle",
    ]),
    buildSection("Charts", ROUTES.DOCS_COMPONENTS, "charts", [
      "bar-chart",
      "gauge",
      "heat-map",
      "line-chart",
      "pie-chart",
      "sparkline",
    ]),
    buildSection("AI", ROUTES.DOCS_COMPONENTS, "ai", [
      "chat-message",
      "chat-thread",
      "file-change",
      "model-selector",
      "streaming-text",
      "thinking-block",
      "token-usage",
      "tool-approval",
      "tool-call",
    ]),
    buildSection("Templates", ROUTES.DOCS, "templates", [
      "app-shell",
      "bullet-list",
      "help-screen",
      "info-box",
      "login-flow",
      "setup-flow",
      "splash-screen",
    ]),
  ],
};

export const docsContentRoute = `${ROUTES.LLMS_MDX}${ROUTES.DOCS}`;
export const docsImageRoute = `${ROUTES.OG}${ROUTES.DOCS}`;
