import { Request, Response } from 'express';
import prisma from '../utils/db';

export const getEducations = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await prisma.education.findMany({ orderBy: { startDate: 'desc' } });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Fetch failed' });
    }
};

export const createEducation = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        const data = await prisma.education.create({
            data: {
                schoolName: body.schoolName,
                degree: body.degree,
                fieldOfStudy: body.fieldOfStudy,
                startDate: body.startDate ? new Date(body.startDate) : null,
                endDate: body.endDate ? new Date(body.endDate) : null,
                isCurrent: body.isCurrent || false,
                grade: body.grade || null,
                description: body.description || null,
            }
        });
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Create failed' });
    }
};

export const updateEducation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const body = req.body;
        const data = await prisma.education.update({
            where: { id: String(id) },
            data: {
                schoolName: body.schoolName,
                degree: body.degree,
                fieldOfStudy: body.fieldOfStudy,
                startDate: body.startDate ? new Date(body.startDate) : null,
                endDate: body.endDate ? new Date(body.endDate) : null,
                isCurrent: body.isCurrent || false,
                grade: body.grade || null,
                description: body.description || null,
            }
        });
        res.json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Update failed' });
    }
};

export const deleteEducation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.education.delete({ where: { id: String(id) } });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
};
