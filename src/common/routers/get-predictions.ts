import express, { NextFunction, Response } from 'express';
import { authMiddleware } from '../../shared/middlewares';
import { IAuthRequest } from '../../shared/interfaces';
import { Prediction } from '../../models';
const router = express.Router();

router.get(
  '/predictions',
  authMiddleware(),
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const username = req.user!.username;
      const predictions = await Prediction.getByUsername(username);
      predictions.sort((a, b) => {
        const bDate = new Date(b.updatedAt ?? new Date());
        const aDate = new Date(a.updatedAt ?? new Date());

        return bDate.getTime() - aDate.getTime();
      });

      res.status(200).send({
        ok: true,
        data: predictions,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

export { router as getPredictionsRouter };
