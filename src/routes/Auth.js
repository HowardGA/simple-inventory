import express from 'express';
import { prisma } from '../prismaClient.js';
import { successResponse, errorResponse } from '../utils/Responses.js';
import { validateUser, validateLogin } from '../utils/validation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = validateUser(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await prisma.user.create({
                data: { name, email, password: hashedPassword }
            });
            successResponse(res, { id: user.id, name: user.name, email: user.email });
        } catch {
            errorResponse(res, "El usuario ya existe", 400);
        }
    } catch (error) {
        errorResponse(res, error.message, 400);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = validateLogin(req.body);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return errorResponse(res, "Usuario no encontrado", 404);
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return errorResponse(res, "Credenciales invalidas", 401);
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('jwt', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict', 
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Send a simple success response
        successResponse(res, { message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        errorResponse(res, error.message, 400);
    }
});

export default router;