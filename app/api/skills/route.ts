import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const data = await prisma.skill.findMany({
            orderBy: { name: 'asc' },
            include: { category: true } // Include category details
        });
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Fetch failed' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = await prisma.skill.create({
            data: {
                name: body.name,
                categoryId: body.categoryId, // Direct relation ID
                level: body.level || 'INTERMEDIATE',
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
        const data = await prisma.skill.update({
            where: { id: body.id },
            data: {
                name: body.name,
                categoryId: body.categoryId,
                level: body.level || 'INTERMEDIATE',
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

        await prisma.skill.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
    }
}
