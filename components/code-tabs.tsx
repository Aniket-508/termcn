"use client";

import * as React from "react";

import { Tabs } from "@/components/ui/tabs";
import { useConfig } from "@/hooks/use-config";

export const CodeTabs = ({ children }: React.ComponentProps<typeof Tabs>) => {
  const [config, setConfig] = useConfig();

  const installationType = React.useMemo(
    () => config.installationType || "cli",
    [config]
  );

  const handleValueChange = React.useCallback(
    (value: string) =>
      setConfig({ ...config, installationType: value as "cli" | "manual" }),
    [config, setConfig]
  );

  return (
    <Tabs
      value={installationType}
      onValueChange={handleValueChange}
      className="relative mt-6 w-full"
    >
      {children}
    </Tabs>
  );
};
