declare module "@opentui/core" {
  export interface CliRendererOptions {
    exitOnCtrlC?: boolean;
  }

  export interface BoxRenderableOptions {
    alignItems?: string;
    border?: boolean;
    flexDirection?: string;
  }

  export interface TextRenderableOptions {
    content: string;
    fg?: string;
    marginLeft?: number;
  }

  export interface CliRenderer {
    root: {
      add(node: unknown): void;
    };
  }

  export interface BoxRenderableInstance {
    add(child: unknown): void;
  }

  export const BoxRenderable: new (
    renderer: unknown,
    options?: BoxRenderableOptions
  ) => BoxRenderableInstance;

  export const TextRenderable: new (
    renderer: unknown,
    options: TextRenderableOptions
  ) => unknown;

  export function createCliRenderer(
    options?: CliRendererOptions
  ): Promise<CliRenderer>;
}
