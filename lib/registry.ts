import path from "node:path";

import type { ExampleFramework } from "@/examples/__index__";
import {
  BASE_NAMES,
  isPublicBaseName,
  PUBLIC_BASE_NAME,
} from "@/registry/bases";

export const INTERNAL_REGISTRY_FRAMEWORKS =
  BASE_NAMES as readonly ExampleFramework[];

export const PUBLIC_REGISTRY_FRAMEWORK = PUBLIC_BASE_NAME as Extract<
  ExampleFramework,
  typeof PUBLIC_BASE_NAME
>;

export const isPublicRegistryFramework = (
  framework: ExampleFramework | undefined
): framework is typeof PUBLIC_REGISTRY_FRAMEWORK => isPublicBaseName(framework);

export const getRegistryUiSourceCandidates = ({
  framework,
  name,
}: {
  framework?: ExampleFramework;
  name: string;
}) => {
  const candidates: string[] = framework
    ? [path.join("registry", "bases", framework, "ui", `${name}.tsx`)]
    : [];

  if (!framework || isPublicRegistryFramework(framework)) {
    candidates.push(path.join("registry", "ui", `${name}.tsx`));
  }

  return [...new Set(candidates)];
};
