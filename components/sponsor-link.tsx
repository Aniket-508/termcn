import { HeartHandshakeIcon } from "lucide-react";

import { LINK } from "@/constants/links";

import { Button } from "./ui/button";

export const SponsorLink = () => (
  <Button asChild size="sm" variant="ghost" sound="click">
    <a href={LINK.SPONSOR} target="_blank" rel="noopener noreferrer">
      <HeartHandshakeIcon className="text-pink-500" />
      Sponsor
    </a>
  </Button>
);
