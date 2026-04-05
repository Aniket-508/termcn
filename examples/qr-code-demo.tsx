import { QRCode } from "@/registry/ui/qr-code";

export default function QRCodeDemo() {
  return <QRCode value="https://termcn.dev" size="md" label="Scan to visit" />;
}
