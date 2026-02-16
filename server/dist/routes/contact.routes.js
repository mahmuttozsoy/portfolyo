"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("../controllers/contact.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.authenticate, contact_controller_1.getMessages); // Only admin can read messages
router.post('/', contact_controller_1.sendMessage); // Public can send
router.delete('/:id', auth_1.authenticate, contact_controller_1.deleteMessage);
exports.default = router;
