import { inkRegistryBase } from "@/registry/bases/ink/registry";
import { opentuiRegistryBase } from "@/registry/bases/opentui/registry";

export interface RegistryBaseDefinition {
  dependencies: readonly string[];
  description: string;
  examplesDir: string;
  isPublic: boolean;
  name: string;
  publicRegistryDir: string | null;
  sourceDir: string;
  title: string;
  type: "registry:runtime";
}

export const BASES = [
  {
    ...inkRegistryBase,
    dependencies: ["ink", "ink-web"],
    description: "React-powered terminal components rendered with Ink.",
    isPublic: true,
    title: "Ink",
    type: "registry:runtime",
  },
  {
    ...opentuiRegistryBase,
    dependencies: ["@opentui/core", "@opentui/react"],
    description:
      "OpenTUI React components for internal previews and future CLI installs.",
    isPublic: false,
    title: "OpenTUI",
    type: "registry:runtime",
  },
] as const satisfies readonly RegistryBaseDefinition[];

export type Base = (typeof BASES)[number];
export type BaseName = Base["name"];

export const BASE_NAMES = BASES.map((base) => base.name) as [
  BaseName,
  ...BaseName[],
];

export const PUBLIC_BASE = BASES.find((base) => base.isPublic) ?? BASES[0];
export const PUBLIC_BASE_NAME = PUBLIC_BASE.name;

export const getBase = (name: BaseName) =>
  BASES.find((base) => base.name === name);

export const isPublicBaseName = (
  name: BaseName | undefined
): name is typeof PUBLIC_BASE_NAME => name === PUBLIC_BASE_NAME;
