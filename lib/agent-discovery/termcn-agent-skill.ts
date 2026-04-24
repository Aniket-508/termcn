import { createHash } from "node:crypto";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

export const TERMCN_AGENT_SKILL_MD = `# ${SITE.NAME} — terminal UI component registry

## Summary

Help users add **${SITE.NAME}** Ink and OpenTUI components via the shadcn CLI against the public registry, and navigate the documentation site.

## Registry

- Registry JSON: \`/r/registry.json\` (shadcn schema)
- Docs: ${ROUTES.DOCS_REGISTRY}

## Install (shadcn)

\`\`\`bash
npx shadcn@latest add https://termcn.dev/r/badge.json
\`\`\`

Prefer following the on-site installation guide: ${ROUTES.DOCS_INSTALLATION}

## When answering

- Prefer linking to \`${ROUTES.DOCS}\` sections over guessing props.
- Components live under Ink and OpenTUI namespaces in the docs.
`;

export const termcnAgentSkillDigest = (): string => {
  const hex = createHash("sha256")
    .update(TERMCN_AGENT_SKILL_MD, "utf-8")
    .digest("hex");

  return `sha256:${hex}`;
};
