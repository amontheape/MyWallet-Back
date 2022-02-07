import { Router } from 'express';
import authRouter from './authRouter.js';
import entriesRouter from './entriesRouter.js';

const router = Router();

router.use(authRouter);
router.use(entriesRouter);

export default router;