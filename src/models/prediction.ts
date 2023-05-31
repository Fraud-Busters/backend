import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

enum PredictionStatus {
  PENDING = 'PENDING',
  FAILED_TO_UPLOAD = 'FAILED_TO_UPLOAD',
  UPLOADED = 'UPLOADED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED_TO_PROCESS = 'FAILED_TO_PROCESS',
}

interface PredictionAttrs {
  inKey: string;
  filename: string;
  outKey?: string;
  status: PredictionStatus;
  username: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PredictionDocMongo extends mongoose.Document<string> {}

export type PredictionDoc = PredictionDocMongo & PredictionAttrs;

interface PredictionModel extends mongoose.Model<PredictionDoc> {
  build(attrs: PredictionAttrs): PredictionDoc;
  getById(id: string): Promise<PredictionDoc | null>;
  getByUsername(username: string): Promise<PredictionDoc[]>;
  getByIdAndUsername(
    id: string,
    username: string
  ): Promise<PredictionDoc | null>;
}

const predictionSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    inKey: {
      type: String,
      required: true,
    },
    outKey: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(PredictionStatus),
    },
    previewResult: {
      type: Array<Array<String>>,
      required: false,
      default: [],
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

predictionSchema.plugin(updateIfCurrentPlugin);
predictionSchema.statics.getById = (id: string) =>
  Prediction.findOne({ _id: id });

predictionSchema.statics.getByIdAndUsername = (id: string, username: string) =>
  Prediction.findOne({ _id: id, username });

predictionSchema.statics.getByUsername = (username: string) =>
  Prediction.find({ username });

predictionSchema.statics.build = (attrs: PredictionAttrs) =>
  new Prediction(attrs);

const Prediction = mongoose.model<PredictionDoc, PredictionModel>(
  'Prediction',
  predictionSchema
);

export { Prediction, PredictionStatus };
