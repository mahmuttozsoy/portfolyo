import { Request, Response } from 'express';
import prisma from '../utils/db';

export const getSkills = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await prisma.skill.findMany({
            orderBy: { name: 'asc' },
            include: { category: true }
        });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Fetch failed' });
    }
};

export const createSkill = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        const data = await prisma.skill.create({
            data: {
                name: body.name,
                categoryId: body.categoryId,
                level: body.level || 'INTERMEDIATE',
            }
        });
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Create failed' });
    }
};

export const updateSkill = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const body = req.body;
        const data = await prisma.skill.update({
            where: { id: String(id) },
            data: {
                name: body.name,
                categoryId: body.categoryId,
                level: body.level || 'INTERMEDIATE',
            }
        });
        res.json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Update failed' });
    }
};

export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.skill.delete({ where: { id: String(id) } });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
};
