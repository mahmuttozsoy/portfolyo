import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const categories = await prisma.skillCategory.findMany({
            orderBy: { order: 'asc' },
            include: { skills: true }
        });
        return NextResponse.json({ success: true, data: categories });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const category = await prisma.skillCategory.create({
            data: {
                name: body.name,
                order: body.order || 0,
            }
        });
        return NextResponse.json({ success: true, data: category }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create category' }, { status: 400 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const category = await prisma.skillCategory.update({
            where: { id: body.id },
            data: {
                name: body.name,
                order: body.order,
            }
        });
        return NextResponse.json({ success: true, data: category });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update category' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

        await prisma.skillCategory.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete category' }, { status: 500 });
    }
}
