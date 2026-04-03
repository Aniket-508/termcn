"use client"

import { CodeIcon } from "lucide-react"
import * as React from "react"

import { CopyButton } from "@/components/copy-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useConfig } from "@/hooks/use-config"

interface CodeBlockProps extends React.ComponentProps<"pre"> {
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
  __ts__?: string
  preview?: React.ReactNode
}

export function CodeBlock({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
  __ts__,
  preview,
}: CodeBlockProps) {
  const [config, setConfig] = useConfig()
  const [highlightedCode, setHighlightedCode] = React.useState<string | null>(
    null
  )

  const isCommandMode = Boolean(__npm__ || __yarn__ || __pnpm__ || __bun__)
  const isCodeMode = Boolean(__ts__)

  React.useEffect(() => {
    if (!__ts__) return
    async function highlight() {
      const { codeToHtml } = await import("shiki")
      const html = await codeToHtml(__ts__!, {
        lang: "tsx",
        themes: {
          dark: "github-dark",
          light: "github-light",
        },
        defaultColor: false,
      })
      setHighlightedCode(html)
    }
    highlight()
  }, [__ts__])

  const packageManager = config.packageManager || "pnpm"
  const commandTabs = React.useMemo(() => {
    return {
      pnpm: __pnpm__,
      npm: __npm__,
      yarn: __yarn__,
      bun: __bun__,
    }
  }, [__npm__, __pnpm__, __yarn__, __bun__])

  const copyValue = React.useMemo(() => {
    if (isCommandMode) {
      return commandTabs[packageManager] || ""
    }
    return __ts__ || ""
  }, [isCommandMode, commandTabs, packageManager, __ts__])

  // Command mode: pnpm/npm/yarn/bun tabs
  if (isCommandMode) {
    return (
      <div className="bg-code text-code-foreground relative overflow-hidden rounded-lg text-sm">
        <Tabs
          value={packageManager}
          className="gap-0"
          onValueChange={(value) => {
            setConfig({
              ...config,
              packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
            })
          }}
        >
          <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
            <TabsList className="rounded-none bg-transparent p-0">
              {Object.entries(commandTabs).map(([key]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
                >
                  {key}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="no-scrollbar overflow-x-auto">
            {Object.entries(commandTabs).map(([key, value]) => (
              <TabsContent key={key} value={key} className="mt-0 px-4 py-3.5">
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
        <CopyButton
          value={copyValue}
          className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        />
      </div>
    )
  }

  // Code mode with optional preview: Preview/Code tabs
  if (isCodeMode && preview) {
    return (
      <div className="bg-code text-code-foreground relative overflow-hidden rounded-lg text-sm">
        <Tabs defaultValue="preview" className="gap-0">
          <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
            <TabsList className="rounded-none bg-transparent p-0">
              <TabsTrigger
                value="preview"
                className="data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
              >
                Code
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="no-scrollbar overflow-x-auto">
            <TabsContent value="preview" className="mt-0 px-4 py-3.5">
              <div className="flex min-h-[200px] items-center justify-center">
                {preview}
              </div>
            </TabsContent>
            <TabsContent value="code" className="mt-0 px-4 py-3.5">
              <CodeContent code={__ts__!} highlightedCode={highlightedCode} />
            </TabsContent>
          </div>
        </Tabs>
        <CopyButton
          value={copyValue}
          className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        />
      </div>
    )
  }

  // Code mode without preview: just show code
  if (isCodeMode) {
    return (
      <div className="bg-code text-code-foreground relative overflow-hidden rounded-lg text-sm">
        <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
          <div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
            <CodeIcon className="text-code size-3" />
          </div>
          <span className="text-muted-foreground text-sm">TypeScript</span>
        </div>
        <div className="no-scrollbar overflow-x-auto px-4 py-3.5">
          <CodeContent code={__ts__!} highlightedCode={highlightedCode} />
        </div>
        <CopyButton
          value={copyValue}
          className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        />
      </div>
    )
  }

  return null
}

function CodeContent({
  code,
  highlightedCode,
}: {
  code: string
  highlightedCode: string | null
}) {
  if (highlightedCode) {
    return (
      <div
        className="max-h-[400px] overflow-auto text-sm [&_pre]:bg-transparent! [&_code]:block [&_span]:text-(--shiki-light) dark:[&_span]:text-(--shiki-dark)"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    )
  }
  return (
    <pre>
      <code className="relative font-mono text-sm leading-none">{code}</code>
    </pre>
  )
}
