"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Allow Vite frontend
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const experience_routes_1 = __importDefault(require("./routes/experience.routes"));
const education_routes_1 = __importDefault(require("./routes/education.routes"));
const skill_routes_1 = __importDefault(require("./routes/skill.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/projects', project_routes_1.default);
app.use('/api/experience', experience_routes_1.default);
app.use('/api/education', education_routes_1.default);
app.use('/api/skills', skill_routes_1.default);
app.use('/api/contact', contact_routes_1.default);
app.use('/api/profile', profile_routes_1.default);
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
