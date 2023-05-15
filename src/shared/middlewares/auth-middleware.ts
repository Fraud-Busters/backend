import { NextFunction, Response } from 'express';
import { IAuthRequest, Role } from '../interfaces';
import { JwtUtil } from '../utils';
import { HttpError } from '../errors';

export const authMiddleware =
  (role?: Role | Role[], useRefreshToken = false) =>
  (req: IAuthRequest, _res: Response, next: NextFunction) => {
    if (useRefreshToken) {
      console.log(req.cookies);
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return next(new HttpError(401, 'auth/missing-refresh-token'));
      }

      try {
        const result = JwtUtil.verifyRefreshToken(refreshToken);
        req.user = result;
        if (role && !role.includes(result.role)) {
          return next(new HttpError(403, 'auth/role-is-not-allowed'));
        }
        next();
      } catch {
        next(new HttpError(403, 'auth/invalid-refresh-token'));
      }

      return;
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(new HttpError(401, 'auth/missing-token'));
    }

    try {
      const result = JwtUtil.verifyAccessToken(token);
      req.user = result;
      if (role && !role.includes(result.role)) {
        return next(new HttpError(403, 'auth/role-is-not-allowed'));
      }
      next();
    } catch {
      next(new HttpError(403, 'auth/invalid-token'));
    }
  };
