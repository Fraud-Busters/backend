import dotenv from 'dotenv';
import joi from 'joi';

dotenv.config();

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: joi.number().positive().required(),
    JWT_ACCESS_SECRET: joi.string().required(),
    JWT_REFRESH_SECRET: joi.string().required(),
    ORIGIN: joi.string().uri().required(),
    GCP_PROJECT_ID: joi.string().required(),
    GCP_PRIVATE_KEY: joi.string().required(),
    GCP_CLIENT_EMAIL: joi.string().required(),
    GCP_BUCKET_NAME: joi.string().required(),
    MONGO_URI: joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  isProduction: envVars.NODE_ENV === 'production',
  jwtAccessSecret: envVars.JWT_ACCESS_SECRET,
  jwtRefreshSecret: envVars.JWT_REFRESH_SECRET,
  origin: envVars.ORIGIN,
  gcp: {
    projectId: envVars.GCP_PROJECT_ID,
    privateKey: envVars.GCP_PRIVATE_KEY,
    clientEmail: envVars.GCP_CLIENT_EMAIL,
    bucketName: envVars.GCP_BUCKET_NAME,
  },
  mongoUri: envVars.MONGO_URI,
};
