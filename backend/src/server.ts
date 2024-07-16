import express, { NextFunction, Request, Response, json } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';
import ticketRoutes from './routes/ticketRoutes';
import bookingRoutes from './routes/bookingRoutes';


const app = express();
export const prisma = new PrismaClient();


app.use(json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', eventRoutes);
app.use('/tickets', ticketRoutes);
app.use('/bookings', bookingRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({
        message: err.message
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});
