"use client";

import { Box, Text } from "ink";
import {
  Component as ReactComponent,
  Suspense,
  useEffect,
  useState,
} from "react";

import { useTheme } from "@/components/ui/theme-provider";
import { ExamplesIndex } from "@/examples/__index__";

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

const RegistryPreview = ({ name }: { name: string }) => {
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
      <Component />
    </PreviewErrorBoundary>
  );
};

export const ExamplePreview = ({ name }: { name: string }) => {
  const example = ExamplesIndex[name];

  if (example) {
    const ExampleComponent = example.component;
    return (
      <PreviewErrorBoundary componentName={name}>
        <Suspense
          fallback={
            <PreviewPlaceholder
              componentName={name}
              description="Loading preview..."
            />
          }
        >
          <ExampleComponent />
        </Suspense>
      </PreviewErrorBoundary>
    );
  }

  return <RegistryPreview name={name} />;
};
