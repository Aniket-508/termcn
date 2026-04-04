"use client";

import { Box, Text } from "ink-web";
import { Component as ReactComponent } from "react";

import { useTheme } from "@/components/ui/theme-provider";

const noop = () => {
  /* noop */
};

const _sampleOptions = ["Alpha", "Beta", "Gamma"];
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

export const PreviewPlaceholder = ({
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

export class PreviewErrorBoundary extends ReactComponent<
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
  children: "Preview",
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

const renderDemoElement = (
  name: string,
  Component: React.ElementType
): React.ReactElement => {
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
      return <Component text="termcn" />;
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
          Registry generation completed successfully.
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
      return <Component code={"pnpm build\n"} language="bash" />;
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
    case "email-input":
    case "masked-input":
    case "number-input":
    case "password-input":
    case "search-input":
    case "text-area":
    case "text-input":
    case "time-picker": {
      return <Component {...props} value="termcn" />;
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
            { key: "name", label: "Name" },
            { key: "status", label: "Status" },
            { key: "version", label: "Version" },
          ]}
          rows={sampleRows}
        />
      );
    }
    case "tag": {
      return <Component>registry</Component>;
    }
    case "thinking-block": {
      return (
        <Component title="Reasoning">
          Grouping registry items by type.
        </Component>
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
    default: {
      return <Component {...props} />;
    }
  }
};

export const renderComponentPreview = (
  name: string,
  Component: React.ElementType
) => (
  <PreviewErrorBoundary componentName={name}>
    {renderDemoElement(name, Component)}
  </PreviewErrorBoundary>
);
