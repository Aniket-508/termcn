/* @jsxImportSource @opentui/react */
import { Spinner, spinnerNames } from "@/registry/bases/opentui/ui/spinner";

export default function OpenTuiSpinnerStyles() {
  return (
    <>
      {spinnerNames.map((name) => (
        <Spinner key={name} label={name} type={name} />
      ))}
    </>
  );
}
