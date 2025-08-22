import express from 'express';
import { prisma } from '../prismaClient.js';
import { successResponse, errorResponse } from '../utils/Responses.js';
import { authenticateToken } from '../middleware/TokenMiddleware.js'

const router = express.Router();

router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
        successResponse(res, user);
    } catch (error) {
        errorResponse(res, error.message, 500);
    }
});

export default router;