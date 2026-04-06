import { SITE } from "@/constants/site";
import { Link } from "@/registry/ui/link";

export default function LinkDemo() {
  return <Link href={SITE.URL}>termcn registry</Link>;
}
