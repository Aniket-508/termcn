import { ROUTES } from "@/constants/routes";
import { requestOrigin } from "@/lib/agent-discovery/request-origin";
import { homeContentRoute } from "@/lib/docs";

const PROFILE = "https://www.rfc-editor.org/info/rfc9727";

const catalogLinkset = (origin: string) => {
  const base = origin.replace(/\/$/, "");

  return {
    linkset: [
      {
        anchor: `${base}/`,
        "api-catalog": [
          {
            href: `${base}/.well-known/api-catalog`,
            type: `application/linkset+json; profile="${PROFILE}"`,
          },
        ],
        describedby: [
          {
            href: `${base}/.well-known/agent-skills/index.json`,
            type: "application/json",
          },
          {
            href: `${base}/.well-known/agent-skills/termcn-skill.md`,
            type: "text/markdown",
          },
        ],
        "service-desc": [
          { href: `${base}/openapi.json`, type: "application/json" },
        ],
        "service-doc": [
          { href: `${base}${ROUTES.DOCS}`, type: "text/html" },
          { href: `${base}${ROUTES.LLMS}`, type: "text/plain" },
          { href: `${base}${ROUTES.LLMS_FULL}`, type: "text/plain" },
          { href: `${base}${homeContentRoute}`, type: "text/markdown" },
        ],
        status: [{ href: `${base}/api/status`, type: "application/json" }],
      },
      {
        anchor: `${base}/r/registry.json`,
        "service-desc": [
          { href: `${base}/openapi.json`, type: "application/json" },
        ],
        "service-doc": [
          { href: `${base}${ROUTES.DOCS_REGISTRY}`, type: "text/html" },
        ],
        status: [{ href: `${base}/api/status`, type: "application/json" }],
      },
    ],
  };
};

export const GET = (request: Request) => {
  const origin = requestOrigin(request);
  const body = JSON.stringify(catalogLinkset(origin));

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": `application/linkset+json; profile="${PROFILE}"`,
    },
  });
};

export const HEAD = (_request: Request) => {
  const profile = `application/linkset+json; profile="${PROFILE}"`;

  return new Response(null, {
    headers: {
      "Content-Type": profile,
      Link: '</.well-known/api-catalog>; rel="api-catalog"',
    },
  });
};
