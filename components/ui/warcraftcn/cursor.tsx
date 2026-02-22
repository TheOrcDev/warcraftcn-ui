import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import "@/components/ui/warcraftcn/styles/warcraft.css";

const cursorVariants = cva("", {
  variants: {
    faction: {
      default: "",
      orc: "wc-orc-cursor",
      elf: "wc-elf-cursor",
      human: "wc-human-cursor",
      undead: "wc-undead-cursor",
    },
  },
  defaultVariants: {
    faction: "default"
  },
});

export interface CursorProps extends React.ComponentProps<"div">, VariantProps<typeof cursorVariants> {
  faction?: "default" | "orc" | "elf" | "human" | "undead";
}

export const Cursor: React.FC<CursorProps> = ({
  className,
  faction = "default",
  children,
  ...props
}) => {
  const cursorClass = cursorVariants({ faction });

  return (
    <div
      className={cn("wc-cursor", cursorClass, className)}
      {...props}
    >
      {children}
    </div>
  );
};