import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET: Fetch all profile data
export async function GET() {
    try {
        const profile = await prisma.profile.findFirst();
        const experiences = await prisma.experience.findMany({ orderBy: { startDate: 'desc' } });
        const educations = await prisma.education.findMany({ orderBy: { startDate: 'desc' } });
        const skillsData = await prisma.skill.findMany({
            orderBy: { name: 'asc' },
            include: { category: true }
        });

        const skills = skillsData.map((skill: any) => ({
            ...skill,
            category: skill.category?.name || 'OTHER'
        }));

        return NextResponse.json({
            success: true,
            data: {
                profile,
                experiences,
                educations,
                skills
            }
        });
    } catch (error) {
        console.error('Fetch profile error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch profile data' }, { status: 500 });
    }
}

// PUT: Update Profile Details
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();

        // Check if profile exists
        let profile = await prisma.profile.findFirst();

        if (profile) {
            // Update
            profile = await prisma.profile.update({
                where: { id: profile.id },
                data: {
                    fullName: body.fullName,
                    title: body.title,
                    bio: body.bio,
                    location: body.location,
                    phone: body.phone,
                    profileImage: body.profileImage,
                    cvUrl: body.cvUrl,
                    githubUrl: body.githubUrl,
                    linkedinUrl: body.linkedinUrl,
                    twitterUrl: body.twitterUrl,
                    websiteUrl: body.websiteUrl,
                }
            });
        } else {
            // Create
            profile = await prisma.profile.create({
                data: {
                    fullName: body.fullName || 'New User',
                    title: body.title || 'Developer',
                    bio: body.bio,
                    location: body.location,
                    phone: body.phone,
                    // ... other fields
                }
            });
        }

        return NextResponse.json({ success: true, data: profile });
    } catch (error) {
        console.error('Update profile error:', error);
        return NextResponse.json({ success: false, error: 'Failed to update profile' }, { status: 500 });
    }
}
