"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

import { ArrowRightIcon } from "./animated-icons/arrow-right";
import type { ArrowRightIconHandle } from "./animated-icons/arrow-right";

const GetStartedButton = () => {
  const arrowRightRef = useRef<ArrowRightIconHandle>(null);

  const handleMouseEnter = useCallback(() => {
    arrowRightRef.current?.startAnimation();
  }, []);

  const handleMouseLeave = useCallback(() => {
    arrowRightRef.current?.stopAnimation();
  }, []);

  return (
    <Button
      asChild
      size="lg"
      sound="click"
      className="px-4 sm:px-6"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={ROUTES.DOCS_INSTALLATION} transitionTypes={["nav-forward"]}>
        Get Started
        <ArrowRightIcon className="hidden sm:inline ml-2" ref={arrowRightRef} />
      </Link>
    </Button>
  );
};

export const HomeCtas = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex flex-wrap items-center justify-center gap-4",
      className
    )}
  >
    <GetStartedButton />
    <Button
      asChild
      size="lg"
      variant="outline"
      sound="click"
      className="px-4 sm:px-6"
    >
      <Link href={ROUTES.DOCS_COMPONENTS} transitionTypes={["nav-forward"]}>
        Browse Components
      </Link>
    </Button>
  </div>
);
