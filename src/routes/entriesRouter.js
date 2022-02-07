import { Router } from 'express';
import { getHistory, handleEntry } from '../controllers/entriesController.js';
import validateEntrySchema from '../middlewares/validateEntrySchema.js';
import validateToken from '../middlewares/validateToken.js';


const entriesRouter = Router();

entriesRouter.get('/history', validateToken, getHistory);
entriesRouter.post('/income', validateToken, validateEntrySchema, handleEntry);
entriesRouter.post('/expense', validateToken, validateEntrySchema, handleEntry);

export default entriesRouter;