"use client";

import { Adventory } from "@/components/adventory";
import type { AdventoryProps } from "@/components/adventory";
import { useIsMobile } from "@/hooks/use-mobile";

interface DocsAdPlacementProps extends AdventoryProps {
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
}

export const DocsAdPlacement = ({
  showOnDesktop = true,
  showOnMobile = false,
  ...props
}: DocsAdPlacementProps) => {
  const isMobile = useIsMobile();
  const show = isMobile ? showOnMobile : showOnDesktop;

  return show ? <Adventory {...props} /> : null;
};
