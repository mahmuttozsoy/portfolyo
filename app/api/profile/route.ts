import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  fallbackProfile,
  fallbackExperiences,
  fallbackEducations,
  fallbackSkills,
} from "@/lib/fallbackData";

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    const experiences = await prisma.experience.findMany({
      orderBy: { startDate: "desc" },
    });
    const educations = await prisma.education.findMany({
      orderBy: { startDate: "desc" },
    });
    const rawSkills = await prisma.skill.findMany({
      orderBy: { name: "asc" },
      include: { category: true },
    });
    const skills = rawSkills.map((s) => ({
      ...s,
      category: s.category?.name || "OTHER",
    }));

    return NextResponse.json({
      success: true,
      data: {
        profile: profile || fallbackProfile,
        experiences: experiences.length > 0 ? experiences : fallbackExperiences,
        educations: educations.length > 0 ? educations : fallbackEducations,
        skills: skills.length > 0 ? skills : fallbackSkills,
      },
    });
  } catch (error) {
    console.warn("Database unavailable, serving fallback profile data:", error);
    return NextResponse.json({
      success: true,
      data: {
        profile: fallbackProfile,
        experiences: fallbackExperiences,
        educations: fallbackEducations,
        skills: fallbackSkills,
      },
    });
  }
}
