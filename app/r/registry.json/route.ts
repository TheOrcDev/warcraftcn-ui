import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { type NextRequest, NextResponse } from "next/server";
import type { Registry } from "shadcn/schema";

export const GET = async (_: NextRequest) => {
  const registryPath = join(process.cwd(), "registry.json");
  const registryContent = await readFile(registryPath, "utf-8");
  const registry: Registry = JSON.parse(registryContent);

  return NextResponse.json(registry);
};
