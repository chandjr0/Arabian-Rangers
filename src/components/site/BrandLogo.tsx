import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <img
      src={logo}
      alt=""
      width={size}
      height={size}
      decoding="async"
      className={cn("h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10", className)}
    />
  );
}
