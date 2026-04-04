import { useCallback } from "react";

const clipboardWrite = (text: string) => {
  const encoded = Buffer.from(text).toString("base64");
  return `\u001B]52;c;${encoded}\u0007`;
};

export const useClipboard = () => {
  const write = useCallback(async (text: string) => {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      await navigator.clipboard.writeText(text);
      return;
    }

    if (typeof process !== "undefined" && process.stdout?.write) {
      process.stdout.write(clipboardWrite(text));
    }
  }, []);

  return { write };
};
