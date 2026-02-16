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
exports.updateProfile = exports.getFullProfile = exports.getProfile = void 0;
const db_1 = __importDefault(require("../utils/db"));
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield db_1.default.profile.findFirst();
        res.json({ success: true, data: profile });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch profile' });
    }
});
exports.getProfile = getProfile;
const getFullProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield db_1.default.profile.findFirst();
        const experiences = yield db_1.default.experience.findMany({ orderBy: { startDate: 'desc' } });
        const educations = yield db_1.default.education.findMany({ orderBy: { startDate: 'desc' } });
        const skillsData = yield db_1.default.skill.findMany({
            orderBy: { name: 'asc' },
            include: { category: true }
        });
        const skills = skillsData.map((skill) => {
            var _a;
            return (Object.assign(Object.assign({}, skill), { category: ((_a = skill.category) === null || _a === void 0 ? void 0 : _a.name) || 'OTHER' }));
        });
        res.json({
            success: true,
            data: {
                profile,
                experiences,
                educations,
                skills
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch full profile' });
    }
});
exports.getFullProfile = getFullProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        let profile = yield db_1.default.profile.findFirst();
        if (profile) {
            profile = yield db_1.default.profile.update({
                where: { id: profile.id },
                data: Object.assign({}, body)
            });
        }
        else {
            profile = yield db_1.default.profile.create({
                data: Object.assign({ fullName: body.fullName || 'New User', title: body.title || 'Developer' }, body)
            });
        }
        res.json({ success: true, data: profile });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update profile' });
    }
});
exports.updateProfile = updateProfile;
