import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import { errorMiddleware } from './shared/middlewares';
import { authRouters } from './auth';
import { API_PREFIX } from './shared/constants';
import cookieParser from 'cookie-parser';
import { config } from './shared/config';

const app = express();
const routers = [...authRouters];

app.set('trust proxy', true);
app.use(
  cors({
    origin: config.origin,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(API_PREFIX, routers);
app.get(API_PREFIX, (_req, res) => {
  res.send('Hello Fraud Busters!');
});
app.get('/', (_req, res) => {
  res.send('Hello Fraud Busters!');
});

app.use(errorMiddleware);
export { app };
