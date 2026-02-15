import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    try {
        // TODO: Add authentication check here
        const body = await req.json();

        // Convert tags array to string if necessary, or handle it in schema
        // For now assuming the body matches the Prisma model fields roughly

        // Make sure nullable fields are handled
        const projectData = {
            title: body.title,
            slug: body.slug,
            shortDescription: body.shortDescription,
            description: body.description,
            image: body.image,
            tags: Array.isArray(body.tags) ? body.tags.join(',') : body.tags,
            demoUrl: body.demoUrl,
            repoUrl: body.repoUrl
        }

        const project = await prisma.project.create({
            data: projectData,
        });
        return NextResponse.json({ success: true, data: project }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 400 });
    }
}
