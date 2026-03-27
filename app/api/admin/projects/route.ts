import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  getProjectConfig,
  saveProjectConfig,
  ProjectConfig,
} from "@/lib/project-config";
import { fetchPortfolioProjects } from "@/lib/github";
import { revalidatePath } from "next/cache";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [githubProjects, config] = await Promise.all([
    fetchPortfolioProjects(),
    getProjectConfig(),
  ]);

  return NextResponse.json({ githubProjects, config });
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const config: ProjectConfig = await request.json();
    await saveProjectConfig(config);
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save project config:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save" },
      { status: 500 }
    );
  }
}
