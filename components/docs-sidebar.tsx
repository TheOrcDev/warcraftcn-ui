"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { TOP_LEVEL_SECTIONS } from "@/config/nav-items";
import type { source } from "@/lib/source";

import { ScrollArea } from "./ui/scroll-area";

export function DocsSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: typeof source.pageTree }) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <ScrollArea className="mt-14 h-full">
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              Sections
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {TOP_LEVEL_SECTIONS.map(({ name, href }) => (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton asChild isActive={pathname === href}>
                      <Link href={href}>
                        <span>{name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {tree.children.map((item, index) => {
            if (item.$id === "root:index.mdx") {
              return null;
            }

            return (
              <SidebarGroup key={item.$id}>
                <SidebarGroupLabel className="px-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  {item.name}
                </SidebarGroupLabel>
                <SidebarGroupContent
                  className={index === tree.children.length - 1 ? "pb-10" : ""}
                >
                  {item.type === "folder" && (
                    <SidebarMenu>
                      {item.children.map((childItem) => {
                        return (
                          childItem.type === "page" && (
                            <SidebarMenuItem key={childItem.$id}>
                              <SidebarMenuButton
                                asChild
                                isActive={pathname === childItem.url}
                              >
                                <Link href={childItem.url}>
                                  <span>{childItem.name}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        );
                      })}
                    </SidebarMenu>
                  )}
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
