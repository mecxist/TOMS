import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default: "bg-[#111] dark:bg-white text-white dark:text-[#111] hover:bg-[#222] dark:hover:bg-[#e5e5e5]",
        destructive:
          "bg-[#dc2626] text-white hover:bg-[#b91c1c]",
        outline:
          "border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] text-[#030213] dark:text-[#fafafa] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]",
        secondary:
          "bg-[#ececf0] dark:bg-[#27272a] text-[#030213] dark:text-[#fafafa] hover:bg-[#e5e5e5] dark:hover:bg-[#333]",
        ghost:
          "text-[#717182] dark:text-[#a1a1aa] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] hover:text-[#111] dark:hover:text-[#e5e5e5]",
        link: "text-[#eb3a14] underline-offset-4 hover:underline",
        accent: "bg-[#eb3a14] text-white hover:bg-[#d63512]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
