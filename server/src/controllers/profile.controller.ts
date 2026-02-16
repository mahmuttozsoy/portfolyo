import { Request, Response } from 'express';
import prisma from '../utils/db';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const profile = await prisma.profile.findFirst();
        res.json({ success: true, data: profile });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch profile' });
    }
};

export const getFullProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const profile = await prisma.profile.findFirst();
        const experiences = await prisma.experience.findMany({ orderBy: { startDate: 'desc' } });
        const educations = await prisma.education.findMany({ orderBy: { startDate: 'desc' } });
        const skillsData = await prisma.skill.findMany({
            orderBy: { name: 'asc' },
            include: { category: true }
        });

        const skills = skillsData.map((skill: any) => ({
            ...skill,
            category: skill.category?.name || 'OTHER'
        }));

        res.json({
            success: true,
            data: {
                profile,
                experiences,
                educations,
                skills
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch full profile' });
    }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        let profile = await prisma.profile.findFirst();

        if (profile) {
            profile = await prisma.profile.update({
                where: { id: profile.id },
                data: { ...body }
            });
        } else {
            profile = await prisma.profile.create({
                data: {
                    fullName: body.fullName || 'New User',
                    title: body.title || 'Developer',
                    ...body
                }
            });
        }

        res.json({ success: true, data: profile });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update profile' });
    }
};
