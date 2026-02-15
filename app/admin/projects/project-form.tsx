'use client';

import { useState, useEffect } from 'react';

interface ProjectFormProps {
    project?: any;
    onClose: () => void;
}

export default function ProjectForm({ project, onClose }: ProjectFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        shortDescription: '',
        image: '',
        repoUrl: '',
        demoUrl: '',
        tags: '',
    });

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title,
                slug: project.slug,
                shortDescription: project.shortDescription,
                image: project.image || '',
                repoUrl: project.repoUrl || '',
                demoUrl: project.demoUrl || '',
                tags: Array.isArray(project.tags) ? project.tags.join(', ') : (project.tags || ''),
            });
        }
    }, [project]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        };

        try {
            if (project) {
                // Update
                await fetch(`/api/projects/${project.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
            } else {
                // Create
                await fetch('/api/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
            }
            onClose();
        } catch (error) {
            console.error('Failed to save project', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-zinc-900 w-full max-w-2xl rounded-2xl border border-zinc-700 p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-6">
                    {project ? 'Edit Project' : 'New Project'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1 text-gray-400">Title</label>
                            <input
                                className="w-full bg-black border border-zinc-700 rounded p-2"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-gray-400">Slug</label>
                            <input
                                className="w-full bg-black border border-zinc-700 rounded p-2"
                                value={formData.slug}
                                onChange={(e) =>
                                    setFormData({ ...formData, slug: e.target.value })
                                }
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-400">Short Description</label>
                        <textarea
                            className="w-full bg-black border border-zinc-700 rounded p-2 h-24"
                            value={formData.shortDescription}
                            onChange={(e) =>
                                setFormData({ ...formData, shortDescription: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-400">Image URL</label>
                        <input
                            className="w-full bg-black border border-zinc-700 rounded p-2"
                            value={formData.image}
                            onChange={(e) =>
                                setFormData({ ...formData, image: e.target.value })
                            }
                            placeholder="/images/project.png"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1 text-gray-400">Repo URL</label>
                            <input
                                className="w-full bg-black border border-zinc-700 rounded p-2"
                                value={formData.repoUrl}
                                onChange={(e) =>
                                    setFormData({ ...formData, repoUrl: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-gray-400">Demo URL</label>
                            <input
                                className="w-full bg-black border border-zinc-700 rounded p-2"
                                value={formData.demoUrl}
                                onChange={(e) =>
                                    setFormData({ ...formData, demoUrl: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-400">Tags (comma separated)</label>
                        <input
                            className="w-full bg-black border border-zinc-700 rounded p-2"
                            value={formData.tags}
                            onChange={(e) =>
                                setFormData({ ...formData, tags: e.target.value })
                            }
                            placeholder="React, Next.js, AI"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 hover:bg-zinc-800 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded"
                        >
                            Save Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
