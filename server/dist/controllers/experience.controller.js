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
exports.deleteExperience = exports.updateExperience = exports.createExperience = exports.getExperiences = void 0;
const db_1 = __importDefault(require("../utils/db"));
const getExperiences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const experiences = yield db_1.default.experience.findMany({
            orderBy: { startDate: 'desc' }
        });
        res.json({ success: true, data: experiences });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch experiences' });
    }
});
exports.getExperiences = getExperiences;
const createExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const experience = yield db_1.default.experience.create({
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
    }
    catch (error) {
        res.status(400).json({ success: false, error: 'Failed to create experience' });
    }
});
exports.createExperience = createExperience;
const updateExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const experience = yield db_1.default.experience.update({
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
    }
    catch (error) {
        res.status(400).json({ success: false, error: 'Update failed' });
    }
});
exports.updateExperience = updateExperience;
const deleteExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield db_1.default.experience.delete({ where: { id: String(id) } });
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
});
exports.deleteExperience = deleteExperience;
