import { ROUTES } from "@/constants/routes";

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
  json: "JSON",
  "qr-code": "QR Code",
};

const titleFromSlug = (slug: string): string =>
  TITLE_OVERRIDES[slug] ??
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const navLeaf = (
  title: string,
  href: string
): NavItemWithChildren["items"][number] => ({
  href,
  items: [],
  title,
});

const componentSection = (
  sectionTitle: string,
  folder: string,
  slugs: readonly string[]
): NavItemWithChildren => ({
  href: `${ROUTES.DOCS}/components/${folder}`,
  items: slugs.map((slug) =>
    navLeaf(titleFromSlug(slug), `${ROUTES.DOCS}/components/${folder}/${slug}`)
  ),
  title: sectionTitle,
});

const THEME_SLUGS = [
  "default",
  "dracula",
  "nord",
  "catppuccin",
  "monokai",
  "solarized",
  "tokyo-night",
  "one-dark",
  "high-contrast",
] as const;

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      items: [
        navLeaf("Introduction", ROUTES.DOCS),
        navLeaf("Components", ROUTES.DOCS_COMPONENTS),
        navLeaf("Get Started", ROUTES.DOCS_GET_STARTED),
        navLeaf("Theming", ROUTES.DOCS_THEMING),
        navLeaf("MCP", ROUTES.DOCS_MCP),
        navLeaf("Registry", ROUTES.DOCS_REGISTRY),
        // navLeaf("Changelog", ROUTES.DOCS_CHANGELOG),
        navLeaf("llms.txt", ROUTES.LLMS),
      ],
      title: "Overview",
    },
    {
      items: THEME_SLUGS.map((slug) =>
        navLeaf(titleFromSlug(slug), `${ROUTES.DOCS}/themes/${slug}`)
      ),
      title: "Themes",
    },
    componentSection("Layout", "layout", [
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
    componentSection("Typography", "typography", [
      "badge",
      "big-text",
      "code",
      "digits",
      "gradient",
      "heading",
      "link",
      "markdown",
      "tag",
      "text",
    ]),
    componentSection("Input", "input", [
      "email-input",
      "masked-input",
      "number-input",
      "password-input",
      "path-input",
      "search-input",
      "text-area",
      "text-input",
    ]),
    componentSection("Selection", "selection", [
      "checkbox",
      "checkbox-group",
      "color-picker",
      "multi-select",
      "radio-group",
      "select",
      "tag-input",
      "tree-select",
    ]),
    componentSection("Data", "data", [
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
    componentSection("Feedback", "feedback", [
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
    componentSection("Navigation", "navigation", [
      "breadcrumb",
      "command-palette",
      "menu",
      "pagination",
      "sidebar",
      "tabbed-content",
      "tabs",
    ]),
    componentSection("Overlays", "overlays", [
      "dialog",
      "drawer",
      "modal",
      "notification-center",
      "popover",
      "tooltip",
    ]),
    componentSection("Forms", "forms", [
      "confirm",
      "date-picker",
      "file-picker",
      "form",
      "form-field",
      "time-picker",
      "wizard",
    ]),
    componentSection("Utility", "utility", [
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
    componentSection("Charts", "charts", [
      "bar-chart",
      "gauge",
      "heat-map",
      "line-chart",
      "pie-chart",
      "sparkline",
    ]),
    componentSection("Templates", "templates", [
      "app-shell",
      "bullet-list",
      "help-screen",
      "info-box",
      "login-flow",
      "setup-flow",
      "splash-screen",
      "usage-monitor",
      "welcome-screen",
    ]),
    componentSection("AI", "ai", [
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
  ],
};

export const docsContentRoute = `${ROUTES.LLMS_MDX}${ROUTES.DOCS}`;
export const docsImageRoute = `${ROUTES.OG}${ROUTES.DOCS}`;
