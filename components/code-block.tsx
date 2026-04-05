"use client";

import { CodeIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { CopyButton } from "@/components/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConfig } from "@/hooks/use-config";
import type { PackageManager } from "@/hooks/use-config";

import { getIconForPackageManager } from "./icons";

interface CodeBlockProps extends React.ComponentProps<"pre"> {
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
  __ts__?: string;
  preview?: React.ReactNode;
}

const codeBlockShellClass =
  "bg-code text-code-foreground relative overflow-hidden rounded-lg text-sm";

const codeBlockCopyButtonClass =
  "absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100";

const useShikiTsxHighlight = (code: string | undefined) => {
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!code) {
      return;
    }
    let cancelled = false;
    const highlight = async () => {
      const { codeToHtml } = await import("shiki");
      const html = await codeToHtml(code, {
        defaultColor: false,
        lang: "tsx",
        themes: {
          dark: "github-dark",
          light: "github-light",
        },
      });
      if (!cancelled) {
        setHighlightedCode(html);
      }
    };
    void highlight();
    return () => {
      cancelled = true;
    };
  }, [code]);

  return highlightedCode;
};

const CodeContent = ({
  code,
  highlightedCode,
}: {
  code: string;
  highlightedCode: string | null;
}) => {
  if (highlightedCode) {
    return (
      <div
        className="max-h-[400px] overflow-auto text-sm [&_pre]:bg-transparent! [&_code]:block [&_span]:text-(--shiki-light) dark:[&_span]:text-(--shiki-dark)"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    );
  }
  return (
    <pre>
      <code className="relative font-mono text-sm leading-none">{code}</code>
    </pre>
  );
};

const CommandCodeBlock = ({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: {
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
}) => {
  const [config, setConfig] = useConfig();

  const commandTabs = useMemo(
    () => ({
      bun: __bun__,
      npm: __npm__,
      pnpm: __pnpm__,
      yarn: __yarn__,
    }),
    [__npm__, __pnpm__, __yarn__, __bun__]
  );

  const packageManager = config.packageManager || "pnpm";

  const handlePackageManagerChange = useCallback(
    (value: string) => {
      setConfig({
        ...config,
        packageManager: value as PackageManager,
      });
    },
    [config, setConfig]
  );

  const copyValue = useMemo(
    () => commandTabs[packageManager] || "",
    [commandTabs, packageManager]
  );

  return (
    <div className={codeBlockShellClass}>
      <Tabs
        className="gap-0"
        onValueChange={handlePackageManagerChange}
        value={packageManager}
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
          <TabsList className="rounded-none bg-transparent p-0 [&_svg]:me-2 [&_svg]:size-4 [&_svg]:text-muted-foreground">
            {getIconForPackageManager(packageManager)}

            {Object.entries(commandTabs).map(([key]) => (
              <TabsTrigger
                key={key}
                className="data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
                value={key}
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {Object.entries(commandTabs).map(([key, value]) => (
            <TabsContent key={key} className="mt-0 px-4 py-3.5" value={key}>
              <pre>
                <code
                  className="relative font-mono text-sm leading-none"
                  data-language="bash"
                >
                  {value}
                </code>
              </pre>
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <CopyButton className={codeBlockCopyButtonClass} value={copyValue} />
    </div>
  );
};

const PreviewCodeBlock = ({
  __ts__,
  preview,
}: {
  __ts__: string;
  preview: React.ReactNode;
}) => {
  const highlightedCode = useShikiTsxHighlight(__ts__);

  return (
    <div className={codeBlockShellClass}>
      <Tabs className="gap-0" defaultValue="preview">
        <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
          <TabsList className="rounded-none bg-transparent p-0">
            <TabsTrigger
              className="data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
              value="preview"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
              value="code"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          <TabsContent className="mt-0 px-4 py-3.5" value="preview">
            <div className="flex min-h-[200px] items-center justify-center">
              {preview}
            </div>
          </TabsContent>
          <TabsContent className="mt-0 px-4 py-3.5" value="code">
            <CodeContent code={__ts__} highlightedCode={highlightedCode} />
          </TabsContent>
        </div>
      </Tabs>
      <CopyButton className={codeBlockCopyButtonClass} value={__ts__} />
    </div>
  );
};

const PlainCodeBlock = ({ __ts__ }: { __ts__: string }) => {
  const highlightedCode = useShikiTsxHighlight(__ts__);

  return (
    <div className={codeBlockShellClass}>
      <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
        <div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
          <CodeIcon className="text-code size-3" />
        </div>
        <span className="text-muted-foreground text-sm">TypeScript</span>
      </div>
      <div className="no-scrollbar overflow-x-auto px-4 py-3.5">
        <CodeContent code={__ts__} highlightedCode={highlightedCode} />
      </div>
      <CopyButton className={codeBlockCopyButtonClass} value={__ts__} />
    </div>
  );
};

export const CodeBlock = ({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
  __ts__,
  preview,
}: CodeBlockProps) => {
  if (__npm__ || __yarn__ || __pnpm__ || __bun__) {
    return (
      <CommandCodeBlock
        __bun__={__bun__}
        __npm__={__npm__}
        __pnpm__={__pnpm__}
        __yarn__={__yarn__}
      />
    );
  }

  if (__ts__ && preview) {
    return <PreviewCodeBlock __ts__={__ts__} preview={preview} />;
  }

  if (__ts__) {
    return <PlainCodeBlock __ts__={__ts__} />;
  }

  return null;
};
