import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface Config {
  style: "new-york-v4";
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
  installationType: "cli" | "manual";
}

const configAtom = atomWithStorage<Config>("config", {
  installationType: "cli",
  packageManager: "pnpm",
  style: "new-york-v4",
});

export function useConfig() {
  return useAtom(configAtom);
}
