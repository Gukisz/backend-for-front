import express from 'express';
import dotenv from 'dotenv';
import categoryRoutes from './src/routes/categoryRoutes';
import productRoutes from './src/routes/productRoutes';

dotenv.config();

const app = express();

app.use(express.json());

// Base route
app.get('/', (req, res) => res.json({ message: 'API rodando' }));

app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

// Generic 404
app.use((req, res) => res.status(404).json({ message: 'Rota não encontrada' }));

export default app;
