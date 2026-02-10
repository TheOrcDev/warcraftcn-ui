"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

import { cn } from "@/lib/utils";

import "@/components/ui/warcraftcn/styles/warcraft.css";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
            <div 
                key={i}
                className="absolute w-1 h-1 bg-amber-400 rounded-full animate-float-particle"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: Math.random() * 0.5
                }}
            />
        ))}
    </div>
  </DialogPrimitive.Overlay>
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    variant?: "default" | "horde";
  }
>(({ className, children, variant = "default", ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fantasy fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 wc-dialog-content p-8 text-amber-50 shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(251,191,36,0.1)] duration-200 data-[state=open]:animate-portal-in data-[state=closed]:animate-portal-out overflow-visible",
        variant === "horde" && "wc-dialog-horde",
        className
      )}
      {...props}
    >
      {/* Texture Layer */}
      <div className="absolute inset-0 wc-parchment pointer-events-none rounded-[32px]" />
      
      {/* Corner Decorations */}
      <div className="wc-corner wc-corner-tl" />
      <div className="wc-corner wc-corner-tr" />
      <div className="wc-corner wc-corner-bl" />
      <div className="wc-corner wc-corner-br" />

      <div className="relative z-10">
        {children}
      </div>
      <DialogPrimitive.Close className="absolute -top-2 -right-2 rounded-full transition-all hover:scale-110 active:scale-95 focus:outline-none z-50 group">
        <div className="relative flex h-12 w-12 items-center justify-center">
          {/* Stylized Red X SVG */}
          <svg
            viewBox="0 0 100 100"
            className="h-10 w-10 wc-close-x"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Dark base for depth */}
            <path
              d="M20 20 L80 80 M80 20 L20 80"
              stroke="#450a0a"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Main Red Stroke */}
            <path
              d="M20 20 L80 80 M80 20 L20 80"
              stroke="#ef4444"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Highlight for shine */}
            <path
              d="M25 25 L40 40 M75 25 L60 40"
              stroke="#fca5a5"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "relative -mx-6 -mt-10 mb-6 flex flex-col items-center",
      className
    )}
    {...props}
  >
    {/* Banner Plaque Background */}
    <div className="absolute inset-0 top-2 h-16 w-full bg-linear-to-r from-transparent via-amber-900/60 to-transparent border-y border-amber-500/40 shadow-[0_0_15px_rgba(251,191,36,0.2)]" />
    <div className="relative z-10 w-full py-4 flex flex-col items-center justify-center">
        {props.children}
    </div>
  </div>
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mt-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-2xl font-bold tracking-wider text-amber-400 [text-shadow:0_0_10px_rgba(251,191,36,0.5)] uppercase",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-lg text-amber-200/80 leading-relaxed", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
