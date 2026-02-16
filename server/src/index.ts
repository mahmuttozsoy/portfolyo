import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: true, // Allow any origin for debugging
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Request logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';
import experienceRoutes from './routes/experience.routes';
import educationRoutes from './routes/education.routes';
import skillRoutes from './routes/skill.routes';
import contactRoutes from './routes/contact.routes';
import profileRoutes from './routes/profile.routes';

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/profile', profileRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
