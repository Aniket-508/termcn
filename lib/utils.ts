import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { siteConfig } from "@/lib/config";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const absoluteUrl = (path: string) => `${siteConfig.url}${path}`;
