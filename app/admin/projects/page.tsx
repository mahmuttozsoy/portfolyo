'use client';

import { useState, useEffect } from 'react';
import ProjectForm from './project-form';

interface Project {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    image?: string;
    repoUrl?: string;
    demoUrl?: string;
}

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const res = await fetch('/api/projects');
        if (res.ok) {
            const data = await res.json();
            setProjects(data.data);
        }
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchProjects();
        }
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingProject(null);
        fetchProjects();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Proje Yönetimi</h1>
                <button
                    onClick={() => {
                        setEditingProject(null);
                        setIsFormOpen(true);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition text-white"
                >
                    + Yeni Proje
                </button>
            </div>

            <div className="grid gap-4">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex justify-between items-center group hover:border-zinc-700 transition"
                    >
                        <div>
                            <h3 className="font-semibold text-lg text-white">{project.title}</h3>
                            <p className="text-gray-400 text-sm">{project.slug}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(project)}
                                className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/30"
                            >
                                Düzenle
                            </button>
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="px-3 py-1 bg-red-600/20 text-red-400 rounded hover:bg-red-600/30"
                            >
                                Sil
                            </button>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <p className="text-center text-gray-500 mt-10">Henüz proje eklenmemiş.</p>
                )}
            </div>

            {isFormOpen && (
                <ProjectForm
                    project={editingProject}
                    onClose={handleFormClose}
                />
            )}
        </div>
    );
}
