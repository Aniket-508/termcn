import { ComponentSource } from "@/components/component-source";
import { ExamplePreview } from "@/components/example-preview";
import { TerminalPreview } from "@/components/terminal-preview";
import type { terminalThemeMap } from "@/lib/terminal-themes";

export const ComponentPreview = ({
  name,
  title,
  className,
  hideCode = false,
  theme,
}: {
  name: string;
  title: string;
  className?: string;
  hideCode?: boolean;
  theme?: keyof typeof terminalThemeMap;
}) => (
  <>
    <TerminalPreview
      defaultThemeKey={theme}
      title={title}
      className={className}
    >
      <ExamplePreview name={name} />
    </TerminalPreview>
    {!hideCode && <ComponentSource name={name} />}
  </>
);
