import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';
import ticketRoutes from './routes/ticketRoutes';
import bookingRoutes from './routes/bookingRoutes';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
export const prisma = new PrismaClient();

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Middleware to serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes); // Use eventRoutes for /api/events endpoint

app.use('/tickets', ticketRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: err.message
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});
