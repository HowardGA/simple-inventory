import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/Auth.js';
import productRoutes from './src/routes/Products.js';
import categoryRoutes from './src/routes/Categories.js';
import dashboardRoutes from './src/routes/Dashboard.js';
import profileRoutes from './src/routes/Profile.js';  
import cookieParser from 'cookie-parser'; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser()); 

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('API para Inventario Sencillo de laboratorios con Node.js, Express y Prisma ORM');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/profile', profileRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

