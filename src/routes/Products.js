import express from 'express';
import { prisma } from '../prismaClient.js';
import { successResponse, errorResponse } from '../utils/Responses.js';
import { validateProduct } from '../utils/validation.js';
import { authenticateToken } from '../middleware/TokenMiddleware.js'

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { itemName, itemDescription, itemPrice, itemStock, categoryId, itemImage } = validateProduct(req.body);
        const product = await prisma.product.create({
            data: { 
                itemName, 
                itemDescription, 
                itemPrice, 
                itemStock, 
                itemImage,
                categoryId, 
                userId: req.user.userId 
            }
        });
        successResponse(res, product);
    } catch (error) {
        errorResponse(res, error.message, 400);
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try{
        const products = await prisma.product.findMany({ include: { category: true } });
        successResponse(res, products);
    } catch (error) {
        errorResponse(res, error.message, 500);
    }

});

router.put('/:id', authenticateToken, async (req, res) => {
    try{
        const product = await prisma.product.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        });
        successResponse(res, product);
    } catch (error) {
        errorResponse(res, error.message, 400);
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await prisma.product.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        errorResponse(res, error.message, 400);
    }
});

export default router;