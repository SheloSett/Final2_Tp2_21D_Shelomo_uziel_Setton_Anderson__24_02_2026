import { Router } from 'express';
import { csvController } from '../controller/csvController.js';


export const csvRouter = Router();
csvRouter.get('/albums/csv', csvController.getCSV);