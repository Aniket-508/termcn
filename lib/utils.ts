import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { siteConfig } from "@/lib/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`
}
