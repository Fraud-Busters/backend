import { db } from '../../shared';
import { CreateHospitalBodyDto } from '../dtos';
import { v4 } from 'uuid';

export const createHospital = async (data: CreateHospitalBodyDto) => {
  await db.hospital.create({
    data: {
      id: v4(),
      ...data,
    },
  });
};
