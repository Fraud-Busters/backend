import { db } from '../../shared';
import { Role } from '../../shared/interfaces';
import { JwtUtil } from '../../shared/utils';

export const refreshToken = async (refreshToken: string) => {
  const { id, username } = JwtUtil.verifyRefreshToken(refreshToken);

  await db.refreshToken.delete({ where: { userId: id } });

  const jwtPayload = {
    id,
    role: Role.User,
    username,
  };

  const tokens = JwtUtil.generateTokens(jwtPayload);

  const { refreshToken: newRefreshToken } = tokens;

  await db.refreshToken.create({
    data: { userId: id, refreshToken: newRefreshToken },
  });

  return { ...tokens, user: jwtPayload };
};
