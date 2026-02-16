import { Request, Response } from 'express';
import prisma from '../utils/db';

export const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json({ success: true, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch projects' });
    }
};

export const getProjectBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
        const { slug } = req.params;
        const project = await prisma.project.findFirst({
            where: { slug: String(slug) }
        });

        if (!project) {
            res.status(404).json({ success: false, error: 'Project not found' });
            return;
        }

        res.json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch project' });
    }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;

        // Basic validation/sanitization could go here

        const project = await prisma.project.create({
            data: {
                title: body.title,
                slug: body.slug, // Ensure unique in DB or handle error
                shortDescription: body.shortDescription,
                description: body.description,
                image: body.image,
                tags: Array.isArray(body.tags) ? body.tags.join(',') : body.tags,
                demoUrl: body.demoUrl,
                repoUrl: body.repoUrl
            }
        });

        res.status(201).json({ success: true, data: project });
    } catch (error) {
        console.error("Create Project Error", error);
        res.status(400).json({ success: false, error: 'Failed to create project' });
    }
};

// Add update/delete as needed
