import { db } from '../../shared';

export const logout = async (refreshToken: string) => {
  try {
    await db.refreshToken.delete({
      where: {
        refreshToken,
      },
    });
  } catch {
    // do nothing
  }
};
