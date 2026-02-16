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
exports.deleteMessage = exports.sendMessage = exports.getMessages = void 0;
const db_1 = __importDefault(require("../utils/db"));
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield db_1.default.contactMessage.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json({ success: true, data: messages });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch messages' });
    }
});
exports.getMessages = getMessages;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const message = yield db_1.default.contactMessage.create({
            data: {
                name: body.name,
                email: body.email,
                subject: body.subject,
                message: body.message,
            }
        });
        res.status(201).json({ success: true, data: message });
    }
    catch (error) {
        res.status(400).json({ success: false, error: 'Failed to send message' });
    }
});
exports.sendMessage = sendMessage;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield db_1.default.contactMessage.delete({ where: { id: String(id) } });
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
});
exports.deleteMessage = deleteMessage;
