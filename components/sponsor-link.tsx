"use client";

import { useCallback, useRef } from "react";

import type { HeartHandshakeIconHandle } from "@/components/animated-icons/heart-handshake";
import { HeartHandshakeIcon } from "@/components/animated-icons/heart-handshake";
import { LINK } from "@/constants/links";

import { Button } from "./ui/button";

export const SponsorLink = () => {
  const heartRef = useRef<HeartHandshakeIconHandle>(null);

  const handleMouseEnter = useCallback(() => {
    heartRef.current?.startAnimation();
  }, []);

  const handleMouseLeave = useCallback(() => {
    heartRef.current?.stopAnimation();
  }, []);

  return (
    <Button
      asChild
      size="sm"
      variant="ghost"
      sound="heart"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href={LINK.SPONSOR} target="_blank" rel="noopener noreferrer">
        <HeartHandshakeIcon className="text-pink-500" ref={heartRef} />
        Sponsor
      </a>
    </Button>
  );
};
