import express from 'express';
import { prisma } from '../prismaClient.js';
import { successResponse, errorResponse } from '../utils/Responses.js';
import { authenticateToken } from '../middleware/TokenMiddleware.js'

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const totalProducts = await prisma.product.count();
        const lowStock = await prisma.product.findMany({ where: { quantity: { lt: 5 } } });
        const totalCategories = await prisma.category.count();
        const totalUsers = await prisma.user.count();
        const dashboardData = {
            totalProducts,
            lowStock: lowStock.length,
            totalCategories,
            totalUsers
        };
        successResponse(res, dashboardData);
    } catch (error) {
        errorResponse(res, error.message, 500);
    }
});

export default router;