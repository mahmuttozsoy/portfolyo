import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET a single project
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const p = await params;
    // Check if id is a slug or uuid. Our frontend uses slug in url /projects/[slug] but admin uses ID.
    // However, the admin panel calls /api/projects/[id]
    // The frontend calls /api/projects via ProjectsSection list.
    // Wait, the frontend doesn't call this route yet. It's for admin operations mainly.
    // If we want to support Slug, we need to handle that.
    // For now let's assume ID is passed as UUID for admin operations.

    const { id } = p;

    try {
        const project = await prisma.project.findUnique({
            where: { id: id }, // Prisma uses 'id' properly
        });

        // Fallback: try searching by slug if not found by UUID (optional, if needed by frontend)
        if (!project) {
            const projectBySlug = await prisma.project.findUnique({
                where: { slug: id }
            });
            if (projectBySlug) {
                return NextResponse.json({ success: true, data: projectBySlug });
            }
            return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: project });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch project' }, { status: 400 });
    }
}

// UPDATE a project
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const body = await request.json();

        // Handle tags array conversion
        const updateData = {
            ...body,
            tags: Array.isArray(body.tags) ? body.tags.join(',') : body.tags
        };
        // Remove _id if present from mongo migration
        delete updateData._id;

        const project = await prisma.project.update({
            where: { id: id },
            data: updateData,
        });

        return NextResponse.json({ success: true, data: project });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 400 });
    }
}

// DELETE a project
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        await prisma.project.delete({
            where: { id: id },
        });
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 400 });
    }
}
