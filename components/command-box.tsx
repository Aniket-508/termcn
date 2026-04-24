"use client";

import { motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";

import { CopyButton } from "@/components/copy-button";
import { getIconForPackageManager } from "@/components/icons";
import { RegistryAddButton } from "@/components/registry-add-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextFlip } from "@/components/ui/text-flip";
import { SITE } from "@/constants/site";
import type { PackageManager } from "@/hooks/use-config";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";
import registry from "@/registry.json";

const pmCommands = {
  bun: "bunx --bun",
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn",
};

const registryItemNames = registry.items
  .map((item) => item.name)
  .toSorted((a, b) =>
    a.localeCompare(b, "en", {
      sensitivity: "base",
    })
  );

export const CommandBox = ({ className }: { className?: string }) => {
  const [config, setConfig] = useConfig();
  const [currentItem, setCurrentItem] = useState(registryItemNames[0] ?? "");

  const packageManager = config.packageManager || "pnpm";

  const commandTabs = useMemo(
    () => ({
      bun: `${pmCommands.bun} shadcn@latest add`,
      npm: `${pmCommands.npm} shadcn@latest add`,
      pnpm: `${pmCommands.pnpm} shadcn@latest add`,
      yarn: `${pmCommands.yarn} shadcn@latest add`,
    }),
    []
  );

  const handlePackageManagerChange = useCallback(
    (value: string) => {
      setConfig({
        ...config,
        packageManager: value as PackageManager,
      });
    },
    [config, setConfig]
  );

  const handleItemChange = useCallback((index: number) => {
    setCurrentItem(registryItemNames[index] ?? registryItemNames[0] ?? "");
  }, []);

  const copyValue = useMemo(
    () => `${commandTabs[packageManager]} ${SITE.REGISTRY}/${currentItem}`,
    [commandTabs, currentItem, packageManager]
  );

  return (
    <div
      className={cn(
        "bg-code text-code-foreground relative overflow-hidden rounded-lg text-sm",
        className
      )}
    >
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
                className="data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
                sound="tabSwitch"
                value={key}
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {Object.entries(commandTabs).map(([key, command]) => (
            <TabsContent
              key={key}
              className="mt-0 px-4 py-3.5 no-scrollbar overflow-x-auto"
              value={key}
            >
              <pre className="text-left">
                <code
                  data-slot="code-block"
                  data-language="bash"
                  className="font-mono text-sm/none text-muted-foreground max-sm:leading-6"
                >
                  <span className="block sm:inline-block flex-1 outline-none">
                    <span className="select-none">$ </span>
                    {command}{" "}
                    <span className="select-none sm:hidden" aria-hidden="true">
                      \
                    </span>
                  </span>

                  <span>{SITE.REGISTRY}/</span>

                  <TextFlip
                    as={motion.span}
                    className="text-foreground"
                    variants={{
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: 8 },
                      initial: { opacity: 0, y: -8 },
                    }}
                    interval={1.5}
                    onIndexChange={handleItemChange}
                  >
                    {registryItemNames.map((itemName) => (
                      <span key={itemName}>{itemName}</span>
                    ))}
                  </TextFlip>
                </code>
              </pre>
            </TabsContent>
          ))}
        </div>
      </Tabs>

      <RegistryAddButton
        registry={SITE.REGISTRY}
        className="absolute top-2 right-10 z-10 h-7 gap-1.5 border-none px-2 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        variant="ghost"
        size="sm"
      />

      <CopyButton
        className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        value={copyValue}
        event="copy_npm_command"
      />
    </div>
  );
};
