import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/db';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-me';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);

        if (!isValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('admin_token');
    res.json({ message: 'Logged out' });
};

export const checkAuth = (req: Request, res: Response) => {
    // Middleware should have already verified token
    res.json({ authenticated: true, user: (req as any).user });
};
