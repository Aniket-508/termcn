/* @jsxImportSource @opentui/react */
import { Spinner } from "@/registry/bases/opentui/ui/spinner";

export default function OpenTuiSpinnerDemo() {
  return (
    <>
      <Spinner label="Loading components..." />
      <Spinner type="arc" label="Building registry..." />
    </>
  );
}
