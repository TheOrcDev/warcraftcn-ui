"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import "@/components/ui/warcraftcn/styles/warcraft.css";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const particles = React.useMemo(() => 
    [...Array(20)].map((_, i) => ({
      width: `${Math.random() * 4 + 2}px`,
      height: `${Math.random() * 4 + 2}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 5 + 3}s`,
    })), []);

  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Magical Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="animate-float-particle absolute bg-amber-400/20 rounded-full blur-[1px]"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>
    </DialogPrimitive.Overlay>
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    faction?: "alliance" | "horde" | "none";
  }
>(({ className, children, faction = "none", ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "wc-dialog-content wc-quest-bg fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 p-10 shadow-[0_0_50px_rgba(0,0,0,0.9)] duration-200 data-[state=open]:animate-portal-in data-[state=closed]:animate-portal-out outline-none border-x-4 border-amber-900/40",
        faction === "horde" && "wc-dialog-horde",
        faction === "alliance" && "wc-dialog-alliance",
        className
      )}
      {...props}
    >
      {/* Corner Plates */}
      <div className="wc-corner-plate -left-4 -top-4 rounded-br-2xl border-r-4 border-b-4 border-slate-700/50">
        <div className="wc-plate-rivet top-2 left-2" />
        <div className="wc-plate-rivet top-2 right-2" />
        <div className="wc-plate-rivet bottom-2 left-2" />
      </div>
      <div className="wc-corner-plate -right-4 -top-4 rounded-bl-2xl border-l-4 border-b-4 border-slate-700/50">
        <div className="wc-plate-rivet top-2 left-2" />
        <div className="wc-plate-rivet top-2 right-2" />
        <div className="wc-plate-rivet bottom-2 right-2" />
      </div>
      <div className="wc-corner-plate -left-4 -bottom-4 rounded-tr-2xl border-r-4 border-t-4 border-slate-700/50">
        <div className="wc-plate-rivet top-2 left-2" />
        <div className="wc-plate-rivet bottom-2 right-2" />
        <div className="wc-plate-rivet bottom-2 left-2" />
      </div>
      <div className="wc-corner-plate -right-4 -bottom-4 rounded-tl-2xl border-l-4 border-t-4 border-slate-700/50">
        <div className="wc-plate-rivet top-2 right-2" />
        <div className="wc-plate-rivet bottom-2 right-2" />
        <div className="wc-plate-rivet bottom-2 left-2" />
      </div>

      {children}

      <DialogPrimitive.Close className="absolute right-[-20px] top-[-20px] w-12 h-14 wc-close-plate flex items-center justify-center rounded-sm z-30 transition-all hover:scale-105 active:scale-95 group shadow-xl">
        <XIcon className="h-8 w-8 text-red-600 stroke-[4px] drop-shadow-[0_0_3px_rgba(0,0,0,0.8)] group-hover:text-red-500" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>

      {/* Frame details */}
      <div className="absolute inset-x-8 top-0 h-1 bg-amber-500/20 blur-[1px]" />
      <div className="absolute inset-x-8 bottom-0 h-1 bg-black/40" />
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
      "flex flex-col space-y-1.5 text-center relative z-10",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end gap-4 relative z-10 mt-6",
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
      "fantasy text-3xl font-bold tracking-widest text-[#f0a500] [text-shadow:2px_2px_0px_#000,0_0_20px_rgba(240,165,0,0.4)] uppercase py-4 border-b border-amber-900/40 mb-4",
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
    className={cn(
      "text-amber-100/90 text-lg leading-relaxed fantasy font-medium [text-shadow:1px_1px_2px_#000] uppercase",
      className
    )}
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
