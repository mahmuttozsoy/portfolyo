import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const experiences = await prisma.experience.findMany({
            orderBy: { startDate: 'desc' }
        });
        return NextResponse.json({ success: true, data: experiences });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch experiences' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const experience = await prisma.experience.create({
            data: {
                companyName: body.companyName,
                position: body.position,
                employmentType: body.employmentType,
                location: body.location,
                startDate: new Date(body.startDate),
                endDate: body.endDate ? new Date(body.endDate) : null,
                isCurrent: body.isCurrent,
                description: body.description,
            }
        });
        return NextResponse.json({ success: true, data: experience }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Failed to create experience' }, { status: 400 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const experience = await prisma.experience.update({
            where: { id: body.id },
            data: {
                companyName: body.companyName,
                position: body.position,
                employmentType: body.employmentType,
                location: body.location,
                // Handle date conversion safely
                startDate: new Date(body.startDate),
                endDate: body.endDate ? new Date(body.endDate) : null,
                isCurrent: body.isCurrent,
                description: body.description,
            }
        });
        return NextResponse.json({ success: true, data: experience });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Update failed' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
        }

        await prisma.experience.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 });
    }
}
