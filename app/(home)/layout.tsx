import { SiteFooter } from "@/components/site-footer";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="container flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
