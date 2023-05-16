import express, { NextFunction, Request, Response } from 'express';
import { authMiddleware } from '../../shared/middlewares';
import { Role } from '../../shared/interfaces';
import { refreshToken } from '../handlers';

const refreshTokenRouter = express.Router();

refreshTokenRouter.get(
  '/auth/refresh',
  authMiddleware(Role.User, true),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken: rToken } = req.cookies;
      const {
        accessToken,
        refreshToken: newRefreshToken,
        user,
      } = await refreshToken(rToken);

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        domain: 'fraud-busters.xyz',
        path: '/',
      });

      res.status(200).json({
        ok: true,
        data: {
          accessToken,
          user,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

export { refreshTokenRouter };
