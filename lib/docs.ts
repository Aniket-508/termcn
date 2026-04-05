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
          href: "/docs/get-started",
          items: [],
          title: "Get Started",
        },
        {
          href: "/docs/theming",
          items: [],
          title: "Theming",
        },
        {
          href: "/docs/mcp",
          items: [],
          title: "MCP",
        },
        {
          href: "/docs/registry",
          items: [],
          title: "Registry",
        },
        {
          href: "/docs/changelog",
          items: [],
          title: "Changelog",
        },
        {
          href: "/llms.txt",
          items: [],
          title: "llms.txt",
        },
      ],
      title: "Overview",
    },
    {
      items: [
        {
          href: "/docs/themes/default",
          items: [],
          title: "Default",
        },
        {
          href: "/docs/themes/dracula",
          items: [],
          title: "Dracula",
        },
        {
          href: "/docs/themes/nord",
          items: [],
          title: "Nord",
        },
        {
          href: "/docs/themes/catppuccin",
          items: [],
          title: "Catppuccin",
        },
        {
          href: "/docs/themes/monokai",
          items: [],
          title: "Monokai",
        },
        {
          href: "/docs/themes/solarized",
          items: [],
          title: "Solarized",
        },
        {
          href: "/docs/themes/tokyo-night",
          items: [],
          title: "Tokyo Night",
        },
        {
          href: "/docs/themes/one-dark",
          items: [],
          title: "One Dark",
        },
        {
          href: "/docs/themes/high-contrast",
          items: [],
          title: "High Contrast",
        },
      ],
      title: "Themes",
    },
    {
      items: [
        {
          href: "/docs/components/layout/aspect-ratio",
          items: [],
          title: "Aspect Ratio",
        },
        {
          href: "/docs/components/layout/box",
          items: [],
          title: "Box",
        },
        {
          href: "/docs/components/layout/center",
          items: [],
          title: "Center",
        },
        {
          href: "/docs/components/layout/columns",
          items: [],
          title: "Columns",
        },
        {
          href: "/docs/components/layout/divider",
          items: [],
          title: "Divider",
        },
        {
          href: "/docs/components/layout/grid",
          items: [],
          title: "Grid",
        },
        {
          href: "/docs/components/layout/scroll-view",
          items: [],
          title: "Scroll View",
        },
        {
          href: "/docs/components/layout/spacer",
          items: [],
          title: "Spacer",
        },
        {
          href: "/docs/components/layout/stack",
          items: [],
          title: "Stack",
        },
      ],
      title: "Layout",
    },
    {
      items: [
        {
          href: "/docs/components/typography/badge",
          items: [],
          title: "Badge",
        },
        {
          href: "/docs/components/typography/big-text",
          items: [],
          title: "Big Text",
        },
        {
          href: "/docs/components/typography/code",
          items: [],
          title: "Code",
        },
        {
          href: "/docs/components/typography/digits",
          items: [],
          title: "Digits",
        },
        {
          href: "/docs/components/typography/gradient",
          items: [],
          title: "Gradient",
        },
        {
          href: "/docs/components/typography/heading",
          items: [],
          title: "Heading",
        },
        {
          href: "/docs/components/typography/link",
          items: [],
          title: "Link",
        },
        {
          href: "/docs/components/typography/markdown",
          items: [],
          title: "Markdown",
        },
        {
          href: "/docs/components/typography/tag",
          items: [],
          title: "Tag",
        },
        {
          href: "/docs/components/typography/text",
          items: [],
          title: "Text",
        },
      ],
      title: "Typography",
    },
    {
      items: [
        {
          href: "/docs/components/input/email-input",
          items: [],
          title: "Email Input",
        },
        {
          href: "/docs/components/input/masked-input",
          items: [],
          title: "Masked Input",
        },
        {
          href: "/docs/components/input/number-input",
          items: [],
          title: "Number Input",
        },
        {
          href: "/docs/components/input/password-input",
          items: [],
          title: "Password Input",
        },
        {
          href: "/docs/components/input/path-input",
          items: [],
          title: "Path Input",
        },
        {
          href: "/docs/components/input/search-input",
          items: [],
          title: "Search Input",
        },
        {
          href: "/docs/components/input/text-area",
          items: [],
          title: "Text Area",
        },
        {
          href: "/docs/components/input/text-input",
          items: [],
          title: "Text Input",
        },
      ],
      title: "Input",
    },
    {
      items: [
        {
          href: "/docs/components/selection/checkbox",
          items: [],
          title: "Checkbox",
        },
        {
          href: "/docs/components/selection/checkbox-group",
          items: [],
          title: "Checkbox Group",
        },
        {
          href: "/docs/components/selection/color-picker",
          items: [],
          title: "Color Picker",
        },
        {
          href: "/docs/components/selection/multi-select",
          items: [],
          title: "Multi Select",
        },
        {
          href: "/docs/components/selection/radio-group",
          items: [],
          title: "Radio Group",
        },
        {
          href: "/docs/components/selection/select",
          items: [],
          title: "Select",
        },
        {
          href: "/docs/components/selection/tag-input",
          items: [],
          title: "Tag Input",
        },
        {
          href: "/docs/components/selection/tree-select",
          items: [],
          title: "Tree Select",
        },
      ],
      title: "Selection",
    },
    {
      items: [
        {
          href: "/docs/components/data/card",
          items: [],
          title: "Card",
        },
        {
          href: "/docs/components/data/data-grid",
          items: [],
          title: "Data Grid",
        },
        {
          href: "/docs/components/data/definition",
          items: [],
          title: "Definition",
        },
        {
          href: "/docs/components/data/diff-view",
          items: [],
          title: "Diff View",
        },
        {
          href: "/docs/components/data/directory-tree",
          items: [],
          title: "Directory Tree",
        },
        {
          href: "/docs/components/data/git-status",
          items: [],
          title: "Git Status",
        },
        {
          href: "/docs/components/data/json",
          items: [],
          title: "JSON",
        },
        {
          href: "/docs/components/data/key-value",
          items: [],
          title: "Key Value",
        },
        {
          href: "/docs/components/data/list",
          items: [],
          title: "List",
        },
        {
          href: "/docs/components/data/table",
          items: [],
          title: "Table",
        },
        {
          href: "/docs/components/data/tree",
          items: [],
          title: "Tree",
        },
        {
          href: "/docs/components/data/virtual-list",
          items: [],
          title: "Virtual List",
        },
      ],
      title: "Data",
    },
    {
      items: [
        {
          href: "/docs/components/feedback/alert",
          items: [],
          title: "Alert",
        },
        {
          href: "/docs/components/feedback/banner",
          items: [],
          title: "Banner",
        },
        {
          href: "/docs/components/feedback/multi-progress",
          items: [],
          title: "Multi Progress",
        },
        {
          href: "/docs/components/feedback/progress-bar",
          items: [],
          title: "Progress Bar",
        },
        {
          href: "/docs/components/feedback/progress-circle",
          items: [],
          title: "Progress Circle",
        },
        {
          href: "/docs/components/feedback/skeleton",
          items: [],
          title: "Skeleton",
        },
        {
          href: "/docs/components/feedback/spinner",
          items: [],
          title: "Spinner",
        },
        {
          href: "/docs/components/feedback/status-message",
          items: [],
          title: "Status Message",
        },
        {
          href: "/docs/components/feedback/toast",
          items: [],
          title: "Toast",
        },
      ],
      title: "Feedback",
    },
    {
      items: [
        {
          href: "/docs/components/navigation/breadcrumb",
          items: [],
          title: "Breadcrumb",
        },
        {
          href: "/docs/components/navigation/command-palette",
          items: [],
          title: "Command Palette",
        },
        {
          href: "/docs/components/navigation/menu",
          items: [],
          title: "Menu",
        },
        {
          href: "/docs/components/navigation/pagination",
          items: [],
          title: "Pagination",
        },
        {
          href: "/docs/components/navigation/sidebar",
          items: [],
          title: "Sidebar",
        },
        {
          href: "/docs/components/navigation/tabbed-content",
          items: [],
          title: "Tabbed Content",
        },
        {
          href: "/docs/components/navigation/tabs",
          items: [],
          title: "Tabs",
        },
      ],
      title: "Navigation",
    },
    {
      items: [
        {
          href: "/docs/components/overlays/dialog",
          items: [],
          title: "Dialog",
        },
        {
          href: "/docs/components/overlays/drawer",
          items: [],
          title: "Drawer",
        },
        {
          href: "/docs/components/overlays/modal",
          items: [],
          title: "Modal",
        },
        {
          href: "/docs/components/overlays/notification-center",
          items: [],
          title: "Notification Center",
        },
        {
          href: "/docs/components/overlays/popover",
          items: [],
          title: "Popover",
        },
        {
          href: "/docs/components/overlays/tooltip",
          items: [],
          title: "Tooltip",
        },
      ],
      title: "Overlays",
    },
    {
      items: [
        {
          href: "/docs/components/forms/confirm",
          items: [],
          title: "Confirm",
        },
        {
          href: "/docs/components/forms/date-picker",
          items: [],
          title: "Date Picker",
        },
        {
          href: "/docs/components/forms/file-picker",
          items: [],
          title: "File Picker",
        },
        {
          href: "/docs/components/forms/form",
          items: [],
          title: "Form",
        },
        {
          href: "/docs/components/forms/form-field",
          items: [],
          title: "Form Field",
        },
        {
          href: "/docs/components/forms/time-picker",
          items: [],
          title: "Time Picker",
        },
        {
          href: "/docs/components/forms/wizard",
          items: [],
          title: "Wizard",
        },
      ],
      title: "Forms",
    },
    {
      items: [
        {
          href: "/docs/components/utility/clipboard",
          items: [],
          title: "Clipboard",
        },
        {
          href: "/docs/components/utility/clock",
          items: [],
          title: "Clock",
        },
        {
          href: "/docs/components/utility/embedded-terminal",
          items: [],
          title: "Embedded Terminal",
        },
        {
          href: "/docs/components/utility/error-boundary",
          items: [],
          title: "Error Boundary",
        },
        {
          href: "/docs/components/utility/help",
          items: [],
          title: "Help",
        },
        {
          href: "/docs/components/utility/image",
          items: [],
          title: "Image",
        },
        {
          href: "/docs/components/utility/keyboard-shortcuts",
          items: [],
          title: "Keyboard Shortcuts",
        },
        {
          href: "/docs/components/utility/log",
          items: [],
          title: "Log",
        },
        {
          href: "/docs/components/utility/panel",
          items: [],
          title: "Panel",
        },
        {
          href: "/docs/components/utility/qr-code",
          items: [],
          title: "QR Code",
        },
        {
          href: "/docs/components/utility/stopwatch",
          items: [],
          title: "Stopwatch",
        },
        {
          href: "/docs/components/utility/timer",
          items: [],
          title: "Timer",
        },
        {
          href: "/docs/components/utility/toggle",
          items: [],
          title: "Toggle",
        },
      ],
      title: "Utility",
    },
    {
      items: [
        {
          href: "/docs/components/charts/bar-chart",
          items: [],
          title: "Bar Chart",
        },
        {
          href: "/docs/components/charts/gauge",
          items: [],
          title: "Gauge",
        },
        {
          href: "/docs/components/charts/heat-map",
          items: [],
          title: "Heat Map",
        },
        {
          href: "/docs/components/charts/line-chart",
          items: [],
          title: "Line Chart",
        },
        {
          href: "/docs/components/charts/pie-chart",
          items: [],
          title: "Pie Chart",
        },
        {
          href: "/docs/components/charts/sparkline",
          items: [],
          title: "Sparkline",
        },
      ],
      title: "Charts",
    },
    {
      items: [
        {
          href: "/docs/components/templates/app-shell",
          items: [],
          title: "App Shell",
        },
        {
          href: "/docs/components/templates/bullet-list",
          items: [],
          title: "Bullet List",
        },
        {
          href: "/docs/components/templates/help-screen",
          items: [],
          title: "Help Screen",
        },
        {
          href: "/docs/components/templates/info-box",
          items: [],
          title: "Info Box",
        },
        {
          href: "/docs/components/templates/login-flow",
          items: [],
          title: "Login Flow",
        },
        {
          href: "/docs/components/templates/setup-flow",
          items: [],
          title: "Setup Flow",
        },
        {
          href: "/docs/components/templates/splash-screen",
          items: [],
          title: "Splash Screen",
        },
        {
          href: "/docs/components/templates/usage-monitor",
          items: [],
          title: "Usage Monitor",
        },
        {
          href: "/docs/components/templates/welcome-screen",
          items: [],
          title: "Welcome Screen",
        },
      ],
      title: "Templates",
    },
    {
      items: [
        {
          href: "/docs/components/ai/chat-message",
          items: [],
          title: "Chat Message",
        },
        {
          href: "/docs/components/ai/chat-thread",
          items: [],
          title: "Chat Thread",
        },
        {
          href: "/docs/components/ai/file-change",
          items: [],
          title: "File Change",
        },
        {
          href: "/docs/components/ai/model-selector",
          items: [],
          title: "Model Selector",
        },
        {
          href: "/docs/components/ai/streaming-text",
          items: [],
          title: "Streaming Text",
        },
        {
          href: "/docs/components/ai/thinking-block",
          items: [],
          title: "Thinking Block",
        },
        {
          href: "/docs/components/ai/token-usage",
          items: [],
          title: "Token Usage",
        },
        {
          href: "/docs/components/ai/tool-approval",
          items: [],
          title: "Tool Approval",
        },
        {
          href: "/docs/components/ai/tool-call",
          items: [],
          title: "Tool Call",
        },
      ],
      title: "AI",
    },
  ],
};
