import { Request, Response } from 'express';
import prisma from '../utils/db';

export const getExperiences = async (req: Request, res: Response): Promise<void> => {
    try {
        const experiences = await prisma.experience.findMany({
            orderBy: { startDate: 'desc' }
        });
        res.json({ success: true, data: experiences });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch experiences' });
    }
};

export const createExperience = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
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
        res.status(201).json({ success: true, data: experience });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to create experience' });
    }
};

export const updateExperience = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const body = req.body;
        const experience = await prisma.experience.update({
            where: { id: String(id) },
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
        res.json({ success: true, data: experience });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Update failed' });
    }
};

export const deleteExperience = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.experience.delete({ where: { id: String(id) } });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
};
