import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded border-transparent px-2 py-0.5 text-[10px] font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-colors overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-[#111] dark:bg-white text-white dark:text-[#111]",
        secondary:
          "bg-[#ececf0] dark:bg-[#27272a] text-[#717182] dark:text-[#a1a1aa]",
        success:
          "bg-[#d1fae5] text-[#059669]",
        warning:
          "bg-[#fef3c7] text-[#d97706]",
        error:
          "bg-[#fee2e2] text-[#dc2626]",
        info:
          "bg-[#dbeafe] text-[#2563eb]",
        outline:
          "border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[#717182] dark:text-[#a1a1aa]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
