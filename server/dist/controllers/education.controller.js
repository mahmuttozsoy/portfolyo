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
exports.deleteEducation = exports.updateEducation = exports.createEducation = exports.getEducations = void 0;
const db_1 = __importDefault(require("../utils/db"));
const getEducations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.default.education.findMany({ orderBy: { startDate: 'desc' } });
        res.json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Fetch failed' });
    }
});
exports.getEducations = getEducations;
const createEducation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = yield db_1.default.education.create({
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
    }
    catch (error) {
        res.status(400).json({ success: false, error: 'Create failed' });
    }
});
exports.createEducation = createEducation;
const updateEducation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const data = yield db_1.default.education.update({
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
    }
    catch (error) {
        res.status(400).json({ success: false, error: 'Update failed' });
    }
});
exports.updateEducation = updateEducation;
const deleteEducation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield db_1.default.education.delete({ where: { id: String(id) } });
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
});
exports.deleteEducation = deleteEducation;
