import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-100",
  {
    variants: {
      variant: {
        default: "bg-cyan-200 text-black hover:bg-cyan-300",
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
        outline: "border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-300/10",
        electric: "bg-[#8DF3FF] text-black hover:bg-[#7DE3EF]",
      },
      size: {
        default: "h-14 px-4 lg:px-6 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        wide: "h-12 px-12 py-3 text-base uppercase tracking-wider font-bold",
      },
      skew: {
        default: "skew-x-[-12deg]",
        reverse: "skew-x-[12deg]",
        slight: "skew-x-[-6deg]",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      skew: "default",
    },
  }
);

export interface SkewedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  unskewText?: boolean;
}

const SkewedButton = React.forwardRef<HTMLButtonElement, SkewedButtonProps>(
  ({ className, variant, size, skew, children, unskewText = true, href, ...props }, ref) => {
    const Comp = href ? "a" : "button";

    return (
      <button
        className={cn(
          "relative px-6 py-3 text-sm duration-200 transition-all",
          "before:absolute group  hover:before:bg-gray-200 before:duration-200 before:inset-0 before:-skew-x-12  before:bg-cyan-200",
          className
        )}
      >
        <span className={` ${className} relative  font-semibold bg-transparent  z-10`}>{children}</span>
      </button>
    );
  }
);

SkewedButton.displayName = "SkewedButton";

export { SkewedButton, buttonVariants };
