import { Router } from 'express';
import { login, register } from '../controllers/authController.js'
import validateUserSchema from '../middlewares/validateUserSchema.js';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', validateUserSchema, register);

export default authRouter;