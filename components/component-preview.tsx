"use client";

import { Box, Text } from "ink";
import { Component as ReactComponent, useEffect, useState } from "react";

import { useTheme } from "@/components/ui/theme-provider";

const noop = () => {
  /* noop */
};

const sampleChoiceObjects = [
  { label: "Alpha", value: "alpha" },
  { label: "Beta", value: "beta" },
  { label: "Gamma", value: "gamma" },
];

const sampleChartData = [
  { label: "Mon", value: 12 },
  { label: "Tue", value: 18 },
  { label: "Wed", value: 9 },
  { label: "Thu", value: 24 },
];

const sampleRows = [
  { name: "termcn", status: "ready", version: "0.1.0" },
  { name: "cli-utils", status: "upstream", version: "1.4.3" },
];

const exportNameOverrides: Record<string, string> = {
  json: "JSONView",
  "qr-code": "QRCode",
};

const kebabToPascal = (slug: string): string =>
  slug.replaceAll(/(^|-)(\w)/g, (_, _sep, c: string) => c.toUpperCase());

const resolveExport = (
  mod: Record<string, unknown>,
  slug: string
): React.ElementType | undefined => {
  const name = exportNameOverrides[slug] ?? kebabToPascal(slug);
  const hit = mod[name] ?? mod.default;
  return typeof hit === "function" ? (hit as React.ElementType) : undefined;
};

type Loader = () => Promise<Record<string, unknown>>;

/* eslint-disable sort-keys */
const registry: Record<string, Loader> = {
  alert: () => import("@/registry/ui/alert"),
  "app-shell": () => import("@/registry/ui/app-shell"),
  "aspect-ratio": () => import("@/registry/ui/aspect-ratio"),
  badge: () => import("@/registry/ui/badge"),
  banner: () => import("@/registry/ui/banner"),
  "bar-chart": () => import("@/registry/ui/bar-chart"),
  "big-text": () => import("@/registry/ui/big-text"),
  box: () => import("@/registry/ui/box"),
  breadcrumb: () => import("@/registry/ui/breadcrumb"),
  "bullet-list": () => import("@/registry/ui/bullet-list"),
  card: () => import("@/registry/ui/card"),
  center: () => import("@/registry/ui/center"),
  "chat-message": () => import("@/registry/ui/chat-message"),
  "chat-thread": () => import("@/registry/ui/chat-thread"),
  checkbox: () => import("@/registry/ui/checkbox"),
  "checkbox-group": () => import("@/registry/ui/checkbox-group"),
  clipboard: () => import("@/registry/ui/clipboard"),
  clock: () => import("@/registry/ui/clock"),
  code: () => import("@/registry/ui/code"),
  "color-picker": () => import("@/registry/ui/color-picker"),
  columns: () => import("@/registry/ui/columns"),
  "command-palette": () => import("@/registry/ui/command-palette"),
  confirm: () => import("@/registry/ui/confirm"),
  "data-grid": () => import("@/registry/ui/data-grid"),
  "date-picker": () => import("@/registry/ui/date-picker"),
  definition: () => import("@/registry/ui/definition"),
  dialog: () => import("@/registry/ui/dialog"),
  "diff-view": () => import("@/registry/ui/diff-view"),
  digits: () => import("@/registry/ui/digits"),
  divider: () => import("@/registry/ui/divider"),
  drawer: () => import("@/registry/ui/drawer"),
  "email-input": () => import("@/registry/ui/email-input"),
  "embedded-terminal": () => import("@/registry/ui/embedded-terminal"),
  "error-boundary": () => import("@/registry/ui/error-boundary"),
  "file-change": () => import("@/registry/ui/file-change"),
  form: () => import("@/registry/ui/form"),
  "form-field": () => import("@/registry/ui/form-field"),
  gauge: () => import("@/registry/ui/gauge"),
  "git-status": () => import("@/registry/ui/git-status"),
  gradient: () => import("@/registry/ui/gradient"),
  grid: () => import("@/registry/ui/grid"),
  heading: () => import("@/registry/ui/heading"),
  "heat-map": () => import("@/registry/ui/heat-map"),
  help: () => import("@/registry/ui/help"),
  "help-screen": () => import("@/registry/ui/help-screen"),
  "info-box": () => import("@/registry/ui/info-box"),
  json: () => import("@/registry/ui/json"),
  "key-value": () => import("@/registry/ui/key-value"),
  "keyboard-shortcuts": () => import("@/registry/ui/keyboard-shortcuts"),
  "line-chart": () => import("@/registry/ui/line-chart"),
  link: () => import("@/registry/ui/link"),
  list: () => import("@/registry/ui/list"),
  log: () => import("@/registry/ui/log"),
  "login-flow": () => import("@/registry/ui/login-flow"),
  markdown: () => import("@/registry/ui/markdown"),
  "masked-input": () => import("@/registry/ui/masked-input"),
  menu: () => import("@/registry/ui/menu"),
  modal: () => import("@/registry/ui/modal"),
  "model-selector": () => import("@/registry/ui/model-selector"),
  "multi-progress": () => import("@/registry/ui/multi-progress"),
  "multi-select": () => import("@/registry/ui/multi-select"),
  "notification-badge": () => import("@/registry/ui/notification-badge"),
  "notification-center": () => import("@/registry/ui/notification-center"),
  "number-input": () => import("@/registry/ui/number-input"),
  pagination: () => import("@/registry/ui/pagination"),
  panel: () => import("@/registry/ui/panel"),
  "password-input": () => import("@/registry/ui/password-input"),
  "pie-chart": () => import("@/registry/ui/pie-chart"),
  popover: () => import("@/registry/ui/popover"),
  "progress-bar": () => import("@/registry/ui/progress-bar"),
  "progress-circle": () => import("@/registry/ui/progress-circle"),
  "qr-code": () => import("@/registry/ui/qr-code"),
  "radio-group": () => import("@/registry/ui/radio-group"),
  "scroll-view": () => import("@/registry/ui/scroll-view"),
  "search-input": () => import("@/registry/ui/search-input"),
  select: () => import("@/registry/ui/select"),
  "setup-flow": () => import("@/registry/ui/setup-flow"),
  sidebar: () => import("@/registry/ui/sidebar"),
  skeleton: () => import("@/registry/ui/skeleton"),
  spacer: () => import("@/registry/ui/spacer"),
  sparkline: () => import("@/registry/ui/sparkline"),
  spinner: () => import("@/registry/ui/spinner"),
  "splash-screen": () => import("@/registry/ui/splash-screen"),
  stack: () => import("@/registry/ui/stack"),
  "status-message": () => import("@/registry/ui/status-message"),
  stopwatch: () => import("@/registry/ui/stopwatch"),
  "streaming-text": () => import("@/registry/ui/streaming-text"),
  "tabbed-content": () => import("@/registry/ui/tabbed-content"),
  table: () => import("@/registry/ui/table"),
  tabs: () => import("@/registry/ui/tabs"),
  tag: () => import("@/registry/ui/tag"),
  "tag-input": () => import("@/registry/ui/tag-input"),
  text: () => import("@/registry/ui/text"),
  "text-area": () => import("@/registry/ui/text-area"),
  "text-input": () => import("@/registry/ui/text-input"),
  "theme-provider": () => import("@/registry/ui/theme-provider"),
  "thinking-block": () => import("@/registry/ui/thinking-block"),
  "time-picker": () => import("@/registry/ui/time-picker"),
  timer: () => import("@/registry/ui/timer"),
  toast: () => import("@/registry/ui/toast"),
  toggle: () => import("@/registry/ui/toggle"),
  "token-usage": () => import("@/registry/ui/token-usage"),
  "tool-approval": () => import("@/registry/ui/tool-approval"),
  "tool-call": () => import("@/registry/ui/tool-call"),
  tooltip: () => import("@/registry/ui/tooltip"),
  tree: () => import("@/registry/ui/tree"),
  "tree-select": () => import("@/registry/ui/tree-select"),
  "usage-monitor": () => import("@/registry/ui/usage-monitor"),
  "virtual-list": () => import("@/registry/ui/virtual-list"),
  "welcome-screen": () => import("@/registry/ui/welcome-screen"),
  wizard: () => import("@/registry/ui/wizard"),
};
/* eslint-enable sort-keys */

const PreviewPlaceholder = ({
  componentName,
  description,
}: {
  componentName: string;
  description: string;
}) => {
  const theme = useTheme();

  return (
    <Box
      borderColor={theme.colors.border}
      borderStyle="round"
      flexDirection="column"
      paddingX={1}
    >
      <Text bold color={theme.colors.primary}>
        {componentName}
      </Text>
      <Text color={theme.colors.foreground}>{description}</Text>
      <Text color={theme.colors.mutedForeground} dimColor>
        Inspect the usage snippet below for install details and example props.
      </Text>
    </Box>
  );
};

class PreviewErrorBoundary extends ReactComponent<
  { children: React.ReactNode; componentName: string },
  { hasError: boolean; message?: string }
> {
  public constructor(props: {
    children: React.ReactNode;
    componentName: string;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <PreviewPlaceholder
          componentName={this.props.componentName}
          description={
            this.state.message
              ? `Live preview fallback: ${this.state.message}`
              : "Live preview fallback."
          }
        />
      );
    }

    return this.props.children;
  }
}

const genericProps = (name: string) => ({
  autoFocus: true,
  checked: true,
  children: <Text>Preview</Text>,
  count: 3,
  currentPage: 2,
  data: sampleChartData,
  defaultValue: "Preview",
  id: `preview-${name}`,
  label: "Preview",
  max: 100,
  onChange: noop,
  onClose: noop,
  onConfirm: noop,
  onSelect: noop,
  onSubmit: noop,
  onToggle: noop,
  options: sampleChoiceObjects,
  page: 2,
  placeholder: "Type here",
  prompt: "Search",
  rows: sampleRows,
  selected: ["alpha"],
  steps: [
    { description: "Install dependencies", label: "Install" },
    { description: "Generate files", label: "Generate" },
    { description: "Ship the registry", label: "Ship" },
  ],
  tags: ["alpha", "beta", "gamma"],
  title: "Preview",
  total: 5,
  totalPages: 5,
  value: "Preview",
  values: ["alpha", "beta"],
  width: 48,
});

const renderVirtualListItem = (item: string) => <Text>{item}</Text>;

// eslint-disable-next-line complexity
const DemoElement = ({
  name,
  Component,
}: {
  name: string;
  Component: React.ElementType;
}) => {
  const props = genericProps(name);

  switch (name) {
    case "alert": {
      return (
        <Component title="Build complete" variant="success">
          Everything is ready to publish.
        </Component>
      );
    }
    case "badge": {
      return <Component variant="success">Active</Component>;
    }
    case "banner": {
      return (
        <Component variant="info">Deployment completed successfully.</Component>
      );
    }
    case "bar-chart":
    case "line-chart":
    case "pie-chart":
    case "sparkline":
    case "heat-map":
    case "gauge": {
      return <Component data={sampleChartData} value={67} max={100} />;
    }
    case "big-text": {
      return <Component>termcn</Component>;
    }
    case "box":
    case "card":
    case "center":
    case "columns":
    case "grid":
    case "panel":
    case "scroll-view":
    case "stack": {
      return (
        <Component {...props}>
          <Text>Preview content</Text>
        </Component>
      );
    }
    case "breadcrumb": {
      return (
        <Component
          items={[
            { label: "Home", value: "/" },
            { label: "Registry", value: "/registry" },
            { label: "Badge", value: "/registry/badge" },
          ]}
        />
      );
    }
    case "checkbox": {
      return <Component checked label="Enable telemetry" />;
    }
    case "chat-message": {
      return (
        <Component sender="assistant" timestamp={new Date()}>
          <Text>Registry generation completed successfully.</Text>
        </Component>
      );
    }
    case "chat-thread": {
      return (
        <Component>
          <Text>assistant: Registry generation completed.</Text>
        </Component>
      );
    }
    case "clock": {
      return <Component />;
    }
    case "code": {
      return <Component language="bash">pnpm build</Component>;
    }
    case "confirm": {
      return <Component message="Deploy the registry now?" value />;
    }
    case "definition": {
      return (
        <Component
          items={[
            {
              description: "The terminal theme provider.",
              term: "ThemeProvider",
            },
            {
              description: "The remote registry entry point.",
              term: "registry.json",
            },
          ]}
        />
      );
    }
    case "digits": {
      return <Component value={2026} />;
    }
    case "divider":
    case "spacer": {
      return <Component />;
    }
    case "date-picker": {
      return <Component value={new Date()} />;
    }
    case "email-input":
    case "number-input":
    case "password-input":
    case "search-input":
    case "text-area":
    case "text-input":
    case "time-picker": {
      return <Component {...props} value="termcn" />;
    }
    case "gradient": {
      return (
        <Component colors={["#ff6b6b", "#4ecdc4", "#45b7d1"]}>
          Terminal UI
        </Component>
      );
    }
    case "help": {
      return (
        <Component
          keymap={{
            "ctrl+c": "Exit",
            "ctrl+s": "Save",
            enter: "Submit",
            tab: "Next field",
          }}
          title="Keyboard shortcuts"
        />
      );
    }
    case "heading": {
      return <Component level={2}>Terminal UI Registry</Component>;
    }
    case "json": {
      return <Component value={{ component: "badge", status: "ready" }} />;
    }
    case "keyboard-shortcuts": {
      return (
        <Component
          shortcuts={[
            { description: "Open command menu", key: "cmd+k" },
            { description: "Switch theme", key: "t" },
          ]}
        />
      );
    }
    case "key-value": {
      return (
        <Component
          items={[
            { key: "registry", value: "termcn" },
            { key: "components", value: "113" },
          ]}
        />
      );
    }
    case "link": {
      return (
        <Component href="https://termcn.vercel.app">termcn registry</Component>
      );
    }
    case "log": {
      return (
        <Component
          entries={[
            { level: "info", message: "Server started on port 3000" },
            { level: "warn", message: "Deprecated API detected" },
            { level: "error", message: "Connection refused" },
          ]}
          height={5}
        />
      );
    }
    case "list":
    case "menu":
    case "pagination":
    case "radio-group":
    case "select":
    case "sidebar":
    case "tabs": {
      return (
        <Component
          {...props}
          options={sampleChoiceObjects}
          items={sampleChoiceObjects}
        />
      );
    }
    case "markdown": {
      return (
        <Component>
          {"# termcn\n\nA **terminal UI** component registry."}
        </Component>
      );
    }
    case "masked-input": {
      return <Component {...props} mask="(###) ###-####" value="5551234567" />;
    }
    case "multi-progress": {
      return (
        <Component
          items={[
            { label: "Generate registry", value: 80 },
            { label: "Build docs", value: 45 },
          ]}
        />
      );
    }
    case "multi-select":
    case "tag-input": {
      return (
        <Component
          {...props}
          options={sampleChoiceObjects}
          value={["alpha", "gamma"]}
        />
      );
    }
    case "progress-bar":
    case "progress-circle": {
      return <Component label="Uploading" max={100} value={62} />;
    }
    case "qr-code": {
      return <Component value="https://termcn.vercel.app" />;
    }
    case "status-message": {
      return <Component variant="success">All systems operational.</Component>;
    }
    case "streaming-text": {
      return <Component streaming text="Generating terminal previews..." />;
    }
    case "table": {
      return (
        <Component
          columns={[
            { header: "Name", key: "name" },
            { header: "Status", key: "status" },
            { header: "Version", key: "version" },
          ]}
          data={sampleRows}
        />
      );
    }
    case "tag": {
      return <Component>registry</Component>;
    }
    case "thinking-block": {
      return (
        <Component
          content="Grouping registry items by type."
          label="Reasoning"
        />
      );
    }
    case "timer": {
      return <Component autoStart duration={90} />;
    }
    case "token-usage": {
      return <Component completion={128} prompt={512} total={640} />;
    }
    case "toggle": {
      return <Component checked label="Theme switcher" />;
    }
    case "tree": {
      return (
        <Component
          nodes={[
            {
              children: [
                { key: "badge", label: "badge.tsx" },
                { key: "card", label: "card.tsx" },
              ],
              key: "ui",
              label: "ui",
            },
            { key: "readme", label: "README.md" },
          ]}
        />
      );
    }
    case "virtual-list": {
      return (
        <Component
          height={5}
          items={Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`)}
          renderItem={renderVirtualListItem}
        />
      );
    }
    default: {
      return <Component {...props} />;
    }
  }
};

export const ComponentPreview = ({ name }: { name: string }) => {
  const [Component, setComponent] = useState<React.ElementType | null>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const loader = registry[name];
    if (!loader) {
      setError(`No registry entry for "${name}"`);
      return;
    }

    const load = async () => {
      try {
        const mod = await loader();
        const resolved = resolveExport(mod, name);
        if (resolved) {
          setComponent(() => resolved);
        } else {
          setError(`No export found for "${name}"`);
        }
      } catch (error_: unknown) {
        setError(
          error_ instanceof Error ? error_.message : "Failed to load component"
        );
      }
    };
    void load();
  }, [name]);

  if (error) {
    return <PreviewPlaceholder componentName={name} description={error} />;
  }

  if (!Component) {
    return (
      <PreviewPlaceholder
        componentName={name}
        description="Loading preview..."
      />
    );
  }

  return (
    <PreviewErrorBoundary componentName={name}>
      <DemoElement Component={Component} name={name} />
    </PreviewErrorBoundary>
  );
};
