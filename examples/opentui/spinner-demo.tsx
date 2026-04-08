import { Spinner } from "@/registry/bases/opentui/components/spinner";

export default function OpenTuiSpinnerDemo() {
  return (
    <>
      <Spinner color="cyan" label="Loading components..." name="dots" />
      <Spinner color="yellow" label="Building registry..." name="arc" />
    </>
  );
}
