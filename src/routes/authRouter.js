import { Router } from 'express';
import { login } from '../controllers/authController.js'
import validateToken from '../middlewares/validateToken.js';


const authRouter = Router();

authRouter.post('/login', validateToken, login);

export default authRouter;