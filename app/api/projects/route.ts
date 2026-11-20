import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fallbackProjects } from "@/lib/fallbackData";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: projects.length > 0 ? projects : fallbackProjects,
    });
  } catch (error) {
    console.warn("Database unavailable, serving fallback projects data:", error);
    return NextResponse.json({
      success: true,
      data: fallbackProjects,
    });
  }
}
