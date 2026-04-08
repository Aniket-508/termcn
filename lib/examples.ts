import { ExamplesIndex } from "@/examples/__index__";
import type { ExampleEntry, ExampleFramework } from "@/examples/__index__";
import { PUBLIC_REGISTRY_FRAMEWORK } from "@/lib/registry";

export type { ExampleEntry, ExampleFramework };

export const getExampleEntry = (
  name: string,
  framework: ExampleFramework = "ink"
): ExampleEntry | null => ExamplesIndex[framework][name] ?? null;

export const hasExampleEntry = (
  name: string,
  framework: ExampleFramework = "ink"
): boolean => getExampleEntry(name, framework) !== null;

export const getExampleFilePath = (
  name: string,
  framework: ExampleFramework = "ink"
): string | null => getExampleEntry(name, framework)?.filePath ?? null;

export const getAvailableExampleFrameworks = (
  name: string
): ExampleFramework[] =>
  (Object.keys(ExamplesIndex) as ExampleFramework[]).filter((framework) =>
    hasExampleEntry(name, framework)
  );

export const getPrimaryExampleNameForComponent = (componentName: string) =>
  `${componentName}-demo`;

export const getAvailableComponentFrameworks = (
  componentName: string
): ExampleFramework[] => {
  const frameworks = getAvailableExampleFrameworks(
    getPrimaryExampleNameForComponent(componentName)
  );

  return frameworks.length > 0 ? frameworks : [PUBLIC_REGISTRY_FRAMEWORK];
};
