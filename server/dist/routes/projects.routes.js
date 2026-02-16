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
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// GET all projects
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield db_1.default.project.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return res.json({ success: true, data: projects });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: 'Failed to fetch projects' });
    }
}));
// GET single project by ID or Slug
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let project = yield db_1.default.project.findUnique({ where: { id } });
        if (!project) {
            project = yield db_1.default.project.findUnique({ where: { slug: id } });
        }
        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }
        return res.json({ success: true, data: project });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: 'Failed to fetch project' });
    }
}));
// CREATE Project (Protected)
router.post('/', auth_middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const projectData = {
            title: body.title,
            slug: body.slug,
            shortDescription: body.shortDescription,
            description: body.description,
            image: body.image,
            tags: Array.isArray(body.tags) ? body.tags.join(',') : body.tags,
            demoUrl: body.demoUrl,
            repoUrl: body.repoUrl
        };
        const project = yield db_1.default.project.create({
            data: projectData,
        });
        return res.status(201).json({ success: true, data: project });
    }
    catch (error) {
        console.error('Create project error:', error);
        return res.status(400).json({ success: false, error: 'Failed to create project' });
    }
}));
// UPDATE Project (Protected)
router.put('/:id', auth_middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const body = req.body;
        const updateData = Object.assign({}, body);
        if (Array.isArray(body.tags)) {
            updateData.tags = body.tags.join(',');
        }
        delete updateData._id;
        delete updateData.id;
        delete updateData.createdAt;
        delete updateData.updatedAt;
        const project = yield db_1.default.project.update({
            where: { id },
            data: updateData,
        });
        return res.json({ success: true, data: project });
    }
    catch (error) {
        return res.status(400).json({ success: false, error: 'Failed to update project' });
    }
}));
// DELETE Project (Protected)
router.delete('/:id', auth_middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.project.delete({ where: { id } });
        return res.json({ success: true, data: {} });
    }
    catch (error) {
        return res.status(400).json({ success: false, error: 'Failed to delete project' });
    }
}));
exports.default = router;
