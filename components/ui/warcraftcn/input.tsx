import type * as React from "react";

import { cn } from "@/lib/utils";

import frameImage from "./assets/input-frame.png";
import "@/components/ui/warcraftcn/styles/warcraft.css";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="fantasy w-100 h-18 flex items-center justify-center bg-center bg-cover bg-no-repeat p-4" style={{ backgroundImage: `url(${frameImage.src})` }}>
        <input
        className={cn(
            "h-9 w-full min-w-0 bg-center bg-cover bg-no-repeat px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
        )}
        data-slot="input"
        type={type}
        {...props}
        />
    </div>
  );
}

export { Input };
