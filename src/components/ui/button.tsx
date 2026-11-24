import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "site-action inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-base font-semibold transition-[transform,box-shadow,color,background-color,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-secondary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-white",
        outline: "border bg-background hover:bg-secondary-foreground hover:text-white",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        light: "bg-white text-[#171717] hover:bg-secondary-foreground hover:text-white",
        destructive: "bg-destructive text-white hover:bg-destructive/90"
      },
      size: {
        default: "h-12 px-6",
        sm: "h-12 px-6",
        lg: "h-12 px-6",
        icon: "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { buttonVariants };
