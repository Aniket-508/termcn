import { loader } from "fumadocs-core/source";

import { docs } from "@/.source/server";
import { ROUTES } from "@/constants/routes";

export const source = loader({
  baseUrl: ROUTES.DOCS,
  source: docs.toFumadocsSource(),
});
