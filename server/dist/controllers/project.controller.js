"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = exports.getProjectBySlug = exports.getProjects = void 0;
const db_1 = __importDefault(require("../utils/db"));
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield db_1.default.project.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json({ success: true, data: projects });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch projects' });
    }
});
exports.getProjects = getProjects;
const getProjectBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const project = yield db_1.default.project.findFirst({
            where: { slug: String(slug) }
        });
        if (!project) {
            res.status(404).json({ success: false, error: 'Project not found' });
            return;
        }
        res.json({ success: true, data: project });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch project' });
    }
});
exports.getProjectBySlug = getProjectBySlug;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // Basic validation/sanitization could go here
        const project = yield db_1.default.project.create({
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
    }
    catch (error) {
        console.error("Create Project Error", error);
        res.status(400).json({ success: false, error: 'Failed to create project' });
    }
});
exports.createProject = createProject;
// Add update/delete as needed
