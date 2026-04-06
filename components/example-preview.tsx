"use client";

import { Box, Text } from "ink";
import { Component as ReactComponent, Suspense } from "react";

import { useTheme } from "@/components/ui/theme-provider";
import { ExamplesIndex } from "@/examples/__index__";

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

export const ExamplePreview = ({ name }: { name: string }) => {
  const example = ExamplesIndex[name];

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
};
