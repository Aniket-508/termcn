import { cn } from "@/lib/utils";

export const LogoMark = ({
  className,
  ...props
}: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Logo Mark"
    className={cn("size-4", className)}
    {...props}
  >
    <rect
      x="16"
      y="16"
      width="224"
      height="224"
      rx="28"
      stroke="currentColor"
      strokeWidth="7"
    />
    <path
      d="m42 56 32 24-32 24"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m208.8 156.8-48 48M199.2 104 108 195.2"
      strokeWidth="19.2"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);
