"use client"
import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const switchVariants = cva(
  [
    "fantasy flex items-center relative",
    "transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-amber-500/50",
    "disabled:opacity-50 disabled:cursor-not-allowed",

    "bg-gradient-to-b from-black via-zinc-900 to-black",
    "shadow-[inset_0_3px_8px_rgba(0,0,0,0.9)]",

    "data-[state=checked]:shadow-[0_0_14px_rgba(34,197,94,0.7)]",
  ],
  {
    variants: {
      size: {
        sm: "w-8 h-4",
        default: "w-12 h-6",
        lg: "w-16 h-8",
      },
      faction: {
        none: "",
        human:
            "data-[state=checked]:shadow-[0_0_16px_rgba(59,130,246,0.7)] " +
            "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-900 data-[state=checked]:to-blue-500",
        orc:
            "data-[state=checked]:shadow-[0_0_16px_rgba(239,68,68,0.7)] " +
            "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-red-900 data-[state=checked]:to-red-500",
        elf:
            "data-[state=checked]:shadow-[0_0_16px_rgba(16,185,129,0.7)] " +
            "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-emerald-900 data-[state=checked]:to-emerald-400",
        undead:
            "data-[state=checked]:shadow-[0_0_16px_rgba(168,85,247,0.7)] " +
            "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-900 data-[state=checked]:to-purple-400",
      },
    },
    defaultVariants: {
      size: "default",
      faction: "none",
    },
  }
)

const thumbVariants = cva(
  [
    "pointer-events-none absolute left-1",
    "transition-all duration-300 ease-out",

    "bg-gradient-to-b from-amber-300 to-amber-600",
    "border border-amber-700",
    "shadow-[0_2px_6px_rgba(0,0,0,0.8)]",

    "[clip-path:polygon(50%_0%,90%_20%,90%_70%,50%_100%,10%_70%,10%_20%)]",

    "before:absolute before:inset-0 before:opacity-0",
    "before:bg-[radial-gradient(circle,rgba(255,215,0,0.6)_0%,transparent_70%)]",
    "data-[state=checked]:before:opacity-100",
    "before:transition-opacity before:duration-300",
  ],
  {
    variants: {
      size: {
        sm: "w-3 h-3 data-[state=checked]:translate-x-4",
        default: "w-5 h-5 data-[state=checked]:translate-x-6",
        lg: "w-7 h-7 data-[state=checked]:translate-x-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface WarcraftSwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root>, VariantProps<typeof switchVariants> {
  label?: string
}

const WarcraftSwitch = ({
  className,
  size,
  faction,
  label,
  ref,
  ...props
}: WarcraftSwitchProps) => {
  return (
    <label className={cn("flex items-center gap-3", props.disabled ? "cursor-not-allowed" : "cursor-pointer")}>
      <SwitchPrimitive.Root
        ref={ref}
        className={cn(
          switchVariants({ size, faction }),
          "rounded-full group",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "absolute inset-0 opacity-0 pointer-events-none",
            "group-data-[state=checked]:opacity-100",
            "bg-[radial-gradient(circle,rgba(255,215,0,0.4)_0%,transparent_70%)]",
            "group-data-[state=checked]:animate-pulse"
          )}
        />

        <SwitchPrimitive.Thumb
          className={cn(thumbVariants({ size }))}
        />
      </SwitchPrimitive.Root>

      {label && (
        <span className="text-sm text-amber-100 fantasy select-none">
          {label}
        </span>
      )}
    </label>
  )
}

WarcraftSwitch.displayName = "WarcraftSwitch"

export { WarcraftSwitch }