import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

import "@/components/ui/warcraftcn/styles/warcraft.css";

const skeletonVariants = cva(
  "fantasy relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "rounded-md",
        circular: "rounded-full",
      },
      faction: {
        default: "wc-skeleton",
        orc: "wc-skeleton-orc",
        elf: "wc-skeleton-elf",
        human: "wc-skeleton-human",
        undead: "wc-skeleton-undead",
      },
    },
    defaultVariants: {
      variant: "default",
      faction: "default",
    },
  }
);

function Skeleton({
  className,
  variant,
  faction,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>) {
  return (
    <div
      className={cn(skeletonVariants({ variant, faction }), className)}
      data-slot="skeleton"
      {...props}
    >
      {/* Faction icon overlay with pulse animation */}
      <div className="wc-skeleton-icons" aria-hidden="true" />
      {/* Shimmer effect overlay */}
      <div className="wc-skeleton-shimmer" aria-hidden="true" />
    </div>
  );
}

export { Skeleton, skeletonVariants };
