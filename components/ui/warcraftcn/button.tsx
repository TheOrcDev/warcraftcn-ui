import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

import bgImage from "./assets/button-bg.png";
import bgWithFrameImage from "./assets/button-bg-with-frame.png";
import bgWithFrameImageSm from "./assets/button-bg-with-frame-sm.png";
import bgImageSm from "./assets/button-bg-sm.png";

import "@/components/ui/warcraftcn/styles/warcraft.css";

const buttonVariants = cva(
  "fantasy inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-all duration-100 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-95 active:brightness-75 active:shadow-inner",
  {
    variants: {
      variant: {
        default:
          "bg-center bg-cover bg-no-repeat text-white shadow-lg transition-shadow hover:shadow-xl hover:brightness-110",
        frame:
          "bg-center bg-cover bg-no-repeat text-white shadow-lg transition-shadow hover:shadow-xl hover:brightness-110",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  asChild = false,
  style,
  size,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  const bgUrl = () => {
    if (variant === "frame") {
      return size === "sm" ? bgWithFrameImageSm.src : bgWithFrameImage.src;
    }

    return size === "sm" ? bgImageSm.src : bgImage.src;
  }

  const sizeClass = () => {

    if(variant === "frame") {
      return size === "sm" ? "w-80 h-26" : "w-120 h-24";
    }
    return size === "sm" ? "w-60 h-17" : "w-104 h-16";
  }
  const sizeClassStyle = { [sizeClass()]: true };

  return(
    <Comp
      className={cn(buttonVariants({ variant, size }), className, sizeClassStyle)}
      style={{ backgroundImage: `url(${bgUrl()})`, ...style }}
      data-slot="button"
      {...props}
    />
  );
}

export { Button, buttonVariants };
