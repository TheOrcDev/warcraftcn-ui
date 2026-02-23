"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import "@/components/ui/warcraftcn/styles/warcraft.css";

const labelVariants = cva(
  "fantasy text-sm font-medium leading-none select-none",
  {
    variants: {
      variant: {
        default:
          "text-amber-200 [text-shadow:0_0_6px_rgba(251,191,36,0.25)]",
        muted: "text-amber-200/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants> & {
    required?: boolean;
    disabled?: boolean;
  };

function Label({
  className,
  variant,
  required = false,
  disabled = false,
  children,
  ...props
}: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      data-disabled={disabled || undefined}
      className={cn(
        labelVariants({ variant }),
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <>
          <span
            aria-hidden="true"
            className="ml-1 text-red-500 [text-shadow:0_0_6px_rgba(239,68,68,0.4)]"
          >
            ✦
          </span>
          <span className="sr-only">(required)</span>
        </>
      )}
    </LabelPrimitive.Root>
  );
}

export { Label, labelVariants };
export type { LabelProps };
