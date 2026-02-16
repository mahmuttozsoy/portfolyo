import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-me';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.admin_token;

    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
