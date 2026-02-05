import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-border border-t px-4 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-muted-foreground text-sm leading-loose md:text-left">
          Built by{" "}
          <Link className="underline" href="https://orcdev.com" target="_blank">
            OrcDev
          </Link>{" "}
          with 🪓
        </p>
      </div>
    </footer>
  );
}
