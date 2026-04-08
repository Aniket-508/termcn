import { ComponentSource } from "@/components/component-source";
import type { TerminalPreviewProps } from "@/components/terminal-preview";
import { TerminalPreview } from "@/components/terminal-preview";
import { TerminalTheme } from "@/components/terminal-theme";
import { cn } from "@/lib/utils";

import { MacWindow } from "./mac-window";

export const ComponentPreview = ({
  framework = "ink",
  name,
  title = "Terminal",
  className,
  hideCode = false,
  theme,
}: TerminalPreviewProps & {
  title?: string;
  className?: string;
  hideCode?: boolean;
}) => (
  <>
    <MacWindow
      className={cn("mt-4", className)}
      title={title}
      trailing={<TerminalTheme />}
    >
      <TerminalPreview framework={framework} name={name} theme={theme} />
    </MacWindow>
    {!hideCode && <ComponentSource framework={framework} name={name} />}
  </>
);
