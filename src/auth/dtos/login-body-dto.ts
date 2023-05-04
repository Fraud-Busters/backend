import { JoiSchema } from 'joi-class-decorators';
import { Joi } from '../../shared/libs';

export class LoginBodyDto {
  @JoiSchema(Joi.string().min(3).required())
  readonly username: string;

  @JoiSchema(Joi.string().string().min(8).max(50).required())
  readonly password: number;
}
