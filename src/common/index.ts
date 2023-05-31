import {
  deletePredictionRouter,
  downloadResultRouter,
  getPredictionsRouter,
  uploadRouter,
} from './routers';

export const commonRouters = [
  uploadRouter,
  getPredictionsRouter,
  deletePredictionRouter,
  downloadResultRouter,
];
