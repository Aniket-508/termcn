"use client";

import { Box, Text } from "ink";
import { Component as ReactComponent, Suspense } from "react";

import { useTheme } from "@/components/ui/theme-provider";
import { getExampleEntry } from "@/lib/examples";
import type { ExampleFramework } from "@/lib/examples";

const InkPreviewPlaceholder = ({
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

const OpenTuiPreviewPlaceholder = ({
  componentName,
  description,
}: {
  componentName: string;
  description: string;
}) => (
  <div className="flex min-h-72 items-center justify-center p-6 text-center text-sm text-muted-foreground">
    <div className="space-y-2">
      <div className="font-medium text-foreground">{componentName}</div>
      <div>{description}</div>
    </div>
  </div>
);

const PreviewPlaceholder = ({
  componentName,
  description,
  framework,
}: {
  componentName: string;
  description: string;
  framework: ExampleFramework;
}) =>
  framework === "opentui" ? (
    <OpenTuiPreviewPlaceholder
      componentName={componentName}
      description={description}
    />
  ) : (
    <InkPreviewPlaceholder
      componentName={componentName}
      description={description}
    />
  );

class PreviewErrorBoundary extends ReactComponent<
  {
    children: React.ReactNode;
    componentName: string;
    framework: ExampleFramework;
  },
  { hasError: boolean; message?: string }
> {
  public constructor(props: {
    children: React.ReactNode;
    componentName: string;
    framework: ExampleFramework;
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
          framework={this.props.framework}
        />
      );
    }

    return this.props.children;
  }
}

export const ExamplePreview = ({
  framework = "ink",
  name,
}: {
  framework?: ExampleFramework;
  name: string;
}) => {
  const example = getExampleEntry(name, framework);
  if (!example) {
    return (
      <PreviewPlaceholder
        componentName={name}
        description={`No ${framework} live preview is registered for this example yet.`}
        framework={framework}
      />
    );
  }

  const ExampleComponent = example.component;

  return (
    <PreviewErrorBoundary componentName={name} framework={framework}>
      <Suspense
        fallback={
          <PreviewPlaceholder
            componentName={name}
            description="Loading preview..."
            framework={framework}
          />
        }
      >
        <ExampleComponent />
      </Suspense>
    </PreviewErrorBoundary>
  );
};
