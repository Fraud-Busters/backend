import express, { NextFunction, Request, Response } from 'express';
import { CreateHospitalBodyDto } from '../dtos';
import { validationMiddleware } from '../../shared/middlewares';
import { createHospital } from '../handlers';

const createHospitalRouter = express.Router();

createHospitalRouter.post(
  '/hospitals',
  validationMiddleware(CreateHospitalBodyDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createHospital(req.body);
      res.status(200).send('OK');
    } catch (err) {
      next(err);
    }
  }
);

export { createHospitalRouter };
