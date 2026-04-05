import { Toast } from "@/registry/ui/toast";

export default function ToastError() {
  return (
    <Toast
      variant="error"
      message="Deploy failed. Check logs."
      duration={8000}
    />
  );
}
