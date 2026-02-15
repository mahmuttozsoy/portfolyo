import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ success: true, data: messages });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch messages' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const message = await prisma.contactMessage.create({
            data: {
                name: body.name,
                email: body.email,
                subject: body.subject,
                message: body.message,
            }
        });
        return NextResponse.json({ success: true, data: message }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

        await prisma.contactMessage.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
    }
}
