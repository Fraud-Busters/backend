import express, { NextFunction, Response } from 'express';
import { authMiddleware, multerMiddleware } from '../../shared/middlewares';
import { IAuthRequest } from '../../shared/interfaces';
import { deleteFile, uploadFile } from '../../gcp/helpers';
import { Prediction } from '../../models';
import { HttpError } from '../../shared/errors';
const router = express.Router();

router.delete(
  '/predictions/:id',
  authMiddleware(),

  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      if (!id) {
        throw new HttpError(400, 'prediction/id-required');
      }

      const username = req.user!.username;

      const prediction = await Prediction.getByIdAndUsername(id, username);

      if (!prediction) {
        throw new HttpError(404, 'prediction/not-found');
      }
      const inKey = prediction.inKey;
      const outKey = prediction.outKey;

      await deleteFile(inKey);
      if (!!outKey) {
        await deleteFile(outKey);
      }

      await prediction.deleteOne();

      res.status(200).send({
        ok: true,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

export { router as deletePredictionRouter };
