import express, { NextFunction, Request, Response } from 'express';
import { LoginBodyDto } from '../dtos';
import { validationMiddleware } from '../../shared/middlewares';
import { login } from '../handlers';

const loginRouter = express.Router();

loginRouter.post(
  '/auth/login',
  validationMiddleware(LoginBodyDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken, refreshToken, user } = await login(req.body);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });

      res.status(200).json({ data: { accessToken, user }, ok: true });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

export { loginRouter };
