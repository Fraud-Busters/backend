import express, { NextFunction, Request, Response } from 'express';

import { logout } from '../handlers';

const logoutRouter = express.Router();

logoutRouter.get(
  '/auth/logout',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        res.status(200).json({ ok: true });
        return;
      }
      await logout(refreshToken);

      res.clearCookie('refreshToken');
      res.status(200).json({ ok: true });
    } catch (err) {
      next(err);
    }
  }
);

export { logoutRouter };
