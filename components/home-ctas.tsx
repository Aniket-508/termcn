"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";

import { ROUTES } from "@/constants/routes";

import { ArrowRightIcon } from "./animated-icons/arrow-right";
import type { ArrowRightIconHandle } from "./animated-icons/arrow-right";
import { Button } from "./ui/button";

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={ROUTES.DOCS_INSTALLATION} transitionTypes={["nav-forward"]}>
        Get Started
        <ArrowRightIcon className="ml-2" ref={arrowRightRef} />
      </Link>
    </Button>
  );
};

export const HomeCtas = () => (
  <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
    <GetStartedButton />
    <Button asChild size="lg" variant="outline" sound="click">
      <Link href={ROUTES.DOCS_COMPONENTS} transitionTypes={["nav-forward"]}>
        Browse Components
      </Link>
    </Button>
  </div>
);
