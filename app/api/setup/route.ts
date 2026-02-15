import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const username = 'admin';
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Upsert Admin User (Create if not exists, Update if exists)
        const user = await prisma.user.upsert({
            where: { username },
            update: {
                passwordHash: hashedPassword,
                role: 'ADMIN'
            },
            create: {
                username,
                passwordHash: hashedPassword,
                role: 'ADMIN'
            },
        });

        return NextResponse.json({
            success: true,
            message: `Admin user ready. Username: ${username}, Password: ${password}`,
            userId: user.id
        });
    } catch (error) {
        console.error('Setup Error:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
