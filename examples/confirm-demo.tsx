import { Confirm } from "@/registry/ui/confirm";

export default function ConfirmDemo() {
  return (
    <Confirm message="Are you sure you want to continue?" defaultValue={true} />
  );
}
