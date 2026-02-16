import { Request, Response } from 'express';
import prisma from '../utils/db';

export const getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch messages' });
    }
};

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        const message = await prisma.contactMessage.create({
            data: {
                name: body.name,
                email: body.email,
                subject: body.subject,
                message: body.message,
            }
        });
        res.status(201).json({ success: true, data: message });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to send message' });
    }
};

export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.contactMessage.delete({ where: { id: String(id) } });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
};
