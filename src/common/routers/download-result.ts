import express, { NextFunction, Response } from 'express';
import { authMiddleware } from '../../shared/middlewares';
import { IAuthRequest } from '../../shared/interfaces';
import { HttpError } from '../../shared/errors';
import { Prediction } from '../../models';
import { getReadStream } from '../../gcp/helpers';

const router = express.Router();

router.get(
  '/download/:id',
  authMiddleware(),
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      if (!id) {
        throw new HttpError(400, 'request/id-required');
      }

      const username = req.user!.username;

      const prediction = await Prediction.getByIdAndUsername(id, username);

      if (!prediction) {
        throw new HttpError(404, 'prediction/not-found');
      }

      const key = prediction.outKey;
      if (!key) {
        throw new HttpError(404, 'prediction/result-not-found');
      }

      const filename = prediction.filename;

      res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename=${filename}`,
      });

      getReadStream(key).pipe(res);
    } catch (err) {
      next(err);
    }
  }
);

export { router as downloadResultRouter };
