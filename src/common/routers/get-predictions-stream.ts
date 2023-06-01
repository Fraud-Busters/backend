import express, { NextFunction, Response } from 'express';
import { authMiddleware } from '../../shared/middlewares';
import { IAuthRequest } from '../../shared/interfaces';
import { Prediction } from '../../models';
import { logger } from '../../shared/libs';
const router = express.Router();

router.get(
  '/predictions/stream',
  authMiddleware(undefined, true),
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const username = req.user!.username;

      logger.info({
        message: 'Get predictions stream',
        username,
      });

      res.setHeader('Connection', 'Keep-Alive');
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');

      Prediction.watch().on('change', async () => {
        logger.info('Change in collection');
        const data = await Prediction.getByUsername(username);
        data.sort((a, b) => {
          const bDate = new Date(b.updatedAt ?? new Date());
          const aDate = new Date(a.updatedAt ?? new Date());

          return bDate.getTime() - aDate.getTime();
        });

        res.write(`event: update\ndata: ${JSON.stringify(data)}\n\n`);
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

export { router as getPredictionsStreamRouter };
