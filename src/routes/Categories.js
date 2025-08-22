import express from 'express';
import { prisma } from '../prismaClient.js';
import { successResponse, errorResponse } from '../utils/Responses.js';
import { authenticateToken } from '../middleware/TokenMiddleware.js'

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    try {
        const category = await prisma.category.create({ data: req.body });
        successResponse(res, category);
    } catch (error) {
        errorResponse(res, error.message, 400);
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        successResponse(res, categories);
    } catch (error) {
        errorResponse(res, error.message, 500);
    }
});

export default router;