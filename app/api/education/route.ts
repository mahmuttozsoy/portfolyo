import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const data = await prisma.education.findMany({ orderBy: { startDate: 'desc' } });
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Fetch failed' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = await prisma.education.create({
            data: {
                schoolName: body.schoolName,
                degree: body.degree,
                fieldOfStudy: body.fieldOfStudy,
                startDate: body.startDate ? new Date(body.startDate) : null,
                endDate: body.endDate ? new Date(body.endDate) : null,
                isCurrent: body.isCurrent || false,
                grade: body.grade || null,
                description: body.description || null,
            }
        });
        return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Create failed' }, { status: 400 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const data = await prisma.education.update({
            where: { id: body.id },
            data: {
                schoolName: body.schoolName,
                degree: body.degree,
                fieldOfStudy: body.fieldOfStudy,
                startDate: body.startDate ? new Date(body.startDate) : null,
                endDate: body.endDate ? new Date(body.endDate) : null,
                isCurrent: body.isCurrent || false, // Ensure isCurrent is saved
                grade: body.grade || null,
                description: body.description || null,
            }
        });
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Update failed' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

        await prisma.education.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
    }
}
