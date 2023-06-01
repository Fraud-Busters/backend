import {
  deletePredictionRouter,
  downloadResultRouter,
  getPredictionsRouter,
  getPredictionsStreamRouter,
  uploadRouter,
} from './routers';

export const commonRouters = [
  uploadRouter,
  getPredictionsRouter,
  deletePredictionRouter,
  downloadResultRouter,
  getPredictionsStreamRouter,
];
