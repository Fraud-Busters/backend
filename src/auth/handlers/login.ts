import { db } from '../../shared';
import { HttpError } from '../../shared/errors';
import { Role } from '../../shared/interfaces';
import { JwtUtil } from '../../shared/utils';
import { LoginBodyDto } from '../dtos';
import bcrypt from 'bcrypt';

export const login = async ({ username, password }: LoginBodyDto) => {
  const user = await db.user.findUnique({
    where: { username },
    select: { password: true, id: true, username: true },
  });

  if (!user) {
    throw new HttpError(404, 'auth/username-not-found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new HttpError(401, 'auth/invalid-password');
  }

  const jwtPayload = {
    id: user.id,
    role: Role.User,
    username: user.username,
  };

  const tokens = JwtUtil.generateTokens(jwtPayload);

  const { refreshToken } = tokens;

  await db.refreshToken.upsert({
    where: { userId: user.id },
    create: { userId: user.id, refreshToken },
    update: { refreshToken },
  });

  const { password: pw, ...rest } = user;

  return {
    ...tokens,
    user: {
      ...rest,
      role: Role.User,
    },
  };
};
