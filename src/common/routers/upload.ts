import express, { NextFunction, Response } from 'express';
import { authMiddleware, multerMiddleware } from '../../shared/middlewares';
import { IAuthRequest } from '../../shared/interfaces';
import { uploadFile } from '../../gcp/helpers';
import { HttpError } from '../../shared/errors';
const router = express.Router();

router.post(
  '/upload',
  authMiddleware(),
  multerMiddleware.single('file'),
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const file = req.file;

      if (!file) {
        throw new HttpError(400, 'file/file-required');
      }
      const username = req.user!.username;

      const id = await uploadFile(file, username);

      res.status(200).send({
        message: 'File uploaded successfully',
        ok: true,
        id,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

export { router as uploadRouter };
