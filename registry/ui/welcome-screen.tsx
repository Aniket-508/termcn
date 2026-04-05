import { Box, Text } from "ink";
import type { ReactNode } from "react";

import { useTheme } from "@/components/ui/theme-provider";

export interface WelcomeScreenProps {
  appName: string;
  appNameColor?: string;
  version?: string;
  borderColor?: string;
  borderStyle?: "single" | "round" | "double" | "bold";
  leftWidth?: number;
  children: ReactNode;
}

export interface WelcomeScreenGreetingProps {
  children: ReactNode;
  bold?: boolean;
  align?: "left" | "center";
  color?: string;
}

export interface WelcomeScreenLogoProps {
  children: ReactNode;
  align?: "left" | "center";
}

export interface WelcomeScreenMetaProps {
  items: string[];
  separator?: string;
  align?: "left" | "center";
  dim?: boolean;
  color?: string;
  stack?: boolean;
}

export interface WelcomeScreenSectionProps {
  title: string;
  titleColor?: string;
  titleBold?: boolean;
  children: ReactNode;
}

// Sub-component slots — detected by displayName
const WelcomeScreenLeft = function WelcomeScreenLeft({
  children,
}: {
  children: ReactNode;
}) {
  return children;
};
WelcomeScreenLeft.displayName = "WelcomeScreen.Left";

const WelcomeScreenRight = function WelcomeScreenRight({
  children,
}: {
  children: ReactNode;
}) {
  return children;
};
WelcomeScreenRight.displayName = "WelcomeScreen.Right";

const WelcomeScreenGreeting = function WelcomeScreenGreeting({
  children,
  bold: boldText = true,
  color,
}: WelcomeScreenGreetingProps) {
  return (
    <Box paddingBottom={1}>
      <Text bold={boldText} color={color}>
        {children}
      </Text>
    </Box>
  );
};

const WelcomeScreenLogo = function WelcomeScreenLogo({
  children,
  align = "left",
}: WelcomeScreenLogoProps) {
  return (
    <Box
      flexDirection="column"
      alignItems={align === "center" ? "center" : "flex-start"}
      paddingY={1}
    >
      {typeof children === "string"
        ? children.split("\n").map((line, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Text key={i}>{line}</Text>
          ))
        : children}
    </Box>
  );
};

const WelcomeScreenMeta = function WelcomeScreenMeta({
  items,
  separator = " · ",
  align = "center",
  dim = false,
  color,
  stack = false,
}: WelcomeScreenMetaProps) {
  if (stack) {
    return (
      <Box
        flexDirection="column"
        alignItems={align === "center" ? "center" : "flex-start"}
        paddingTop={1}
      >
        {items.map((item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Text key={i} dimColor={dim} color={color}>
            {item}
          </Text>
        ))}
      </Box>
    );
  }

  return (
    <Box
      flexDirection="row"
      flexWrap="wrap"
      justifyContent={align === "center" ? "center" : "flex-start"}
      paddingTop={1}
    >
      {items.map((item, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Text key={i} dimColor={dim} color={color}>
          {item}
          {i < items.length - 1 ? separator : ""}
        </Text>
      ))}
    </Box>
  );
};

const WelcomeScreenSection = function WelcomeScreenSection({
  title,
  titleColor,
  titleBold = true,
  children,
}: WelcomeScreenSectionProps) {
  const theme = useTheme();
  return (
    <Box flexDirection="column" paddingBottom={1}>
      <Text bold={titleBold} color={titleColor ?? theme.colors.primary}>
        {title}
      </Text>
      <Text>{children}</Text>
    </Box>
  );
};

const WelcomeScreenRoot = function WelcomeScreenRoot({
  appName,
  appNameColor,
  version,
  borderColor,
  borderStyle = "single",
  leftWidth = 26,
  children,
}: WelcomeScreenProps) {
  const theme = useTheme();
  const resolvedBorderColor = borderColor ?? theme.colors.border;
  const resolvedAppNameColor = appNameColor ?? theme.colors.primary;

  // eslint-disable-next-line react/no-react-children
  const childArray = React.Children.toArray(children);
  const leftChildren = childArray.filter(
    (c) =>
      React.isValidElement(c) &&
      (c.type as { displayName?: string }).displayName === "WelcomeScreen.Left"
  );
  const rightChildren = childArray.filter(
    (c) =>
      React.isValidElement(c) &&
      (c.type as { displayName?: string }).displayName === "WelcomeScreen.Right"
  );

  const leftContent = leftChildren.flatMap((c) =>
    React.isValidElement(c)
      ? // eslint-disable-next-line react/no-react-children
        React.Children.toArray(
          (c.props as { children?: React.ReactNode }).children
        )
      : []
  );
  const rightContent = rightChildren.flatMap((c) =>
    React.isValidElement(c)
      ? // eslint-disable-next-line react/no-react-children
        React.Children.toArray(
          (c.props as { children?: React.ReactNode }).children
        )
      : []
  );

  const titleStr = version ? `${appName} ${version}` : appName;

  return (
    <Box flexDirection="column">
      {/* Titled top border line */}
      <Box flexDirection="row">
        <Text color={resolvedBorderColor}>{"── "}</Text>
        <Text color={resolvedAppNameColor} bold>
          {titleStr}
        </Text>
        <Text color={resolvedBorderColor}>{" ─"}</Text>
      </Box>
      {/* Two-panel body with border */}
      <Box
        borderStyle={borderStyle}
        borderColor={resolvedBorderColor}
        borderTop={false}
        flexDirection="row"
      >
        {/* Left panel */}
        <Box width={leftWidth} flexDirection="column" paddingX={1} paddingY={1}>
          {leftContent}
        </Box>
        {/* Vertical divider */}
        <Box width={1} flexDirection="column" alignItems="center">
          <Text color={resolvedBorderColor}>│</Text>
        </Box>
        {/* Right panel */}
        <Box flexGrow={1} flexDirection="column" paddingX={1} paddingY={1}>
          {rightContent}
        </Box>
      </Box>
    </Box>
  );
};

export const WelcomeScreen = Object.assign(WelcomeScreenRoot, {
  Greeting: WelcomeScreenGreeting,
  Left: WelcomeScreenLeft,
  Logo: WelcomeScreenLogo,
  Meta: WelcomeScreenMeta,
  Right: WelcomeScreenRight,
  Section: WelcomeScreenSection,
});
