import express from 'express';
import dotenv from 'dotenv';
import courseRoutes from './routes/courseRoutes';
import studentRoutes from './routes/studentRoutes';

dotenv.config();

const app = express();

app.use(express.json());

// Base route
app.get('/', (req, res) => res.json({ message: 'API rodando' }));

app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);

// Generic 404
app.use((req, res) => res.status(404).json({ message: 'Rota não encontrada' }));

export default app;
