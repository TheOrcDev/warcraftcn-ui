import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/warcraftcn/button";

import "@/components/ui/warcraftcn/styles/warcraft.css";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1 list-none", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  disabled,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    aria-disabled={disabled ? "true" : undefined}
    tabIndex={disabled ? -1 : undefined}
    className={cn(
      buttonVariants({
        variant: "frame",
      }),
      "border-solid [border-image-repeat:stretch] border-5 [border-image-slice:16_fill] wc-btn-border-frame transition-all duration-200",
      "w-10 h-10 px-0 sm:w-12 sm:h-12 flex items-center justify-center font-bold no-underline",
      isActive
        ? "text-amber-200 [text-shadow:0_0_8px_rgba(251,191,36,0.6)] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] brightness-110"
        : "text-amber-100/70 hover:text-amber-100 hover:brightness-110",
      disabled && "opacity-50 pointer-events-none cursor-not-allowed",
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("gap-1 sm:w-auto sm:px-4 sm:pr-5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4 text-amber-500 filter-[drop-shadow(0_0_2px_rgba(245,158,11,0.5))]" />
    <span className="hidden sm:block">Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("gap-1 sm:w-auto sm:px-4 sm:pl-5", className)}
    {...props}
  >
    <span className="hidden sm:block">Next</span>
    <ChevronRight className="h-4 w-4 text-amber-500 filter-[drop-shadow(0_0_2px_rgba(245,158,11,0.5))]" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    className={cn(
      "flex h-9 w-10 sm:w-12 items-center justify-center select-none",
      className
    )}
    {...props}
  >
    <span 
      aria-hidden="true"
      className="text-amber-500/60 font-bold tracking-[2px] text-xs [text-shadow:0_0_4px_rgba(245,158,11,0.3)]"
    >
      ♦ ♦ ♦
    </span>
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
