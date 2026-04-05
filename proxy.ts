import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ROUTES } from "@/constants/routes";
import { docsContentRoute } from "@/lib/docs";

const { rewrite: rewriteDocs } = rewritePath(
  `${ROUTES.DOCS}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${ROUTES.DOCS}{/*path}.mdx`,
  `${docsContentRoute}{/*path}/content.md`
);

export default function proxy(request: NextRequest) {
  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const result2 = rewriteDocs(request.nextUrl.pathname);

    if (result2) {
      return NextResponse.rewrite(new URL(result2, request.nextUrl));
    }
  }

  return NextResponse.next();
}
