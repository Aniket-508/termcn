import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { homeContentRoute } from "@/lib/docs";

export const buildOpenApiDocument = (
  origin: string
): Record<string, unknown> => {
  const base = origin.replace(/\/$/, "");

  return {
    info: {
      description: `Read-only HTTP surfaces for the ${SITE.NAME} documentation site and shadcn component registry.`,
      title: "termcn public HTTP API",
      version: "0.1.0",
    },
    openapi: "3.0.3",
    paths: {
      "/.well-known/agent-skills/index.json": {
        get: {
          responses: {
            "200": { description: "Agent skills index" },
          },
          summary: "Agent skills discovery index",
        },
      },
      "/.well-known/agent-skills/termcn-skill.md": {
        get: {
          responses: {
            "200": { description: "Agent skill markdown" },
          },
          summary: "termcn agent skill markdown",
        },
      },
      "/.well-known/api-catalog": {
        get: {
          responses: {
            "200": { description: "API catalog linkset" },
          },
          summary: "Machine-readable API catalog",
        },
        head: {
          responses: {
            "200": { description: "API catalog headers" },
          },
          summary: "API catalog headers",
        },
      },
      "/api/status": {
        get: {
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    properties: { status: { example: "ok", type: "string" } },
                    type: "object",
                  },
                },
              },
              description: "OK",
            },
          },
          summary: "Service health",
        },
      },
      "/llms-full.txt": {
        get: {
          responses: {
            "200": { description: "Plain text bundle" },
          },
          summary: "Full LLM-oriented documentation export",
        },
      },
      "/llms.txt": {
        get: {
          responses: {
            "200": { description: "Plain text index" },
          },
          summary: "LLM-oriented documentation index",
        },
      },
      "/openapi.json": {
        get: {
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: { type: "object" },
                },
              },
              description: "OpenAPI JSON",
            },
          },
          summary: "This OpenAPI document",
        },
      },
      "/r/registry.json": {
        get: {
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: { type: "object" },
                },
              },
              description: "Registry manifest",
            },
          },
          summary: "shadcn/ui component registry index",
        },
      },
      [ROUTES.DOCS]: {
        get: {
          responses: {
            "200": { description: "HTML documentation" },
          },
          summary: "Documentation (HTML)",
        },
      },
      [homeContentRoute]: {
        get: {
          responses: {
            "200": { description: "Homepage markdown export" },
          },
          summary: "Homepage markdown export",
        },
        head: {
          responses: {
            "200": { description: "Homepage markdown headers" },
          },
          summary: "Homepage markdown headers",
        },
      },
    },
    servers: [{ url: base }],
  };
};
