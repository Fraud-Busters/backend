import { JoiSchema } from 'joi-class-decorators';
import { Joi } from '../../shared/libs';

export class CreateHospitalBodyDto {
  @JoiSchema(Joi.string().min(3).required())
  readonly name: string;

  @JoiSchema(Joi.string().min(3).required())
  readonly contact: string;

  @JoiSchema(Joi.string().min(3).required())
  readonly postalCode: string;

  @JoiSchema(Joi.string().min(3).required())
  readonly address: string;

  @JoiSchema(Joi.string().min(3).required())
  readonly addressDetail: string;

  @JoiSchema(Joi.string().min(3).required())
  readonly regNo: string;

  @JoiSchema(Joi.string().min(3).required())
  readonly licenseNo: string;

  @JoiSchema(Joi.string().min(3).required())
  readonly ceoName: string;

  @JoiSchema(Joi.string().min(3).required())
  readonly ceoPhone: string;

  @JoiSchema(Joi.string().min(3).required())
  readonly managerPhone: string;

  @JoiSchema(Joi.string().min(3).required())
  readonly details: string;

  @JoiSchema(Joi.string().min(3).required())
  readonly refundName: string;

  @JoiSchema(Joi.string().min(3).required())
  readonly refundBankName: string;

  @JoiSchema(Joi.string().min(3).required())
  readonly refundBankAccount: string;
}
