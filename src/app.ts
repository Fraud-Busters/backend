import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import { errorMiddleware } from './shared/middlewares';
import { authRouters } from './auth';
import { API_PREFIX } from './shared/constants';
import { hospitalRouters } from './hospitals';
import cookieParser from 'cookie-parser';

const app = express();
const routers = [...authRouters, ...hospitalRouters];

app.set('trust proxy', true);
app.use(
  cors({
    origin: '*',
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
routers.forEach((router) => app.use(API_PREFIX, router));

app.use(errorMiddleware);
export { app };
