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
exports.deleteSkill = exports.updateSkill = exports.createSkill = exports.getSkills = void 0;
const db_1 = __importDefault(require("../utils/db"));
const getSkills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.default.skill.findMany({
            orderBy: { name: 'asc' },
            include: { category: true }
        });
        res.json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Fetch failed' });
    }
});
exports.getSkills = getSkills;
const createSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = yield db_1.default.skill.create({
            data: {
                name: body.name,
                categoryId: body.categoryId,
                level: body.level || 'INTERMEDIATE',
            }
        });
        res.status(201).json({ success: true, data });
    }
    catch (error) {
        res.status(400).json({ success: false, error: 'Create failed' });
    }
});
exports.createSkill = createSkill;
const updateSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const data = yield db_1.default.skill.update({
            where: { id: String(id) },
            data: {
                name: body.name,
                categoryId: body.categoryId,
                level: body.level || 'INTERMEDIATE',
            }
        });
        res.json({ success: true, data });
    }
    catch (error) {
        res.status(400).json({ success: false, error: 'Update failed' });
    }
});
exports.updateSkill = updateSkill;
const deleteSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield db_1.default.skill.delete({ where: { id: String(id) } });
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
});
exports.deleteSkill = deleteSkill;
