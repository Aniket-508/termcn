"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export interface AdventoryProps {
  type: "banner" | "card";
  className?: string;
}

export const Adventory = ({ type = "banner", className }: AdventoryProps) => {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = `https://adventory.to/ad.${type}.js`;
    script.async = true;
    script.dataset.placement =
      type === "banner"
        ? "c275735f-3a21-4a39-84be-49a581feee18"
        : "e02a027a-5b7e-4870-b3c6-feecd01b5e8c";

    if (resolvedTheme === "dark") {
      script.dataset.theme = "dark";
    }

    container.append(script);

    return () => {
      container.innerHTML = "";
    };
  }, [resolvedTheme, type]);

  return (
    <div
      ref={containerRef}
      className={cn("w-full", type === "banner" ? "h-10" : "h-44", className)}
    />
  );
};
