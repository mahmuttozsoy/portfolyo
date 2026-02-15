import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-me';

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Generate JWT
        const token = await new SignJWT({ userId: user.id, username: user.username })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1d')
            .sign(new TextEncoder().encode(JWT_SECRET));

        // Create response
        const response = NextResponse.json({ success: true });

        // Set Cookie
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400, // 1 day
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: 'Login failed' },
            { status: 500 }
        );
    }
}
