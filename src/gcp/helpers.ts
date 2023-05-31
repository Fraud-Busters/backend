import { bucket } from './storage';
import { format } from 'util';
import path from 'path';
import { Prediction, PredictionStatus } from '../models';

export const getPublicUrl = (fileKey: string) =>
  format(`https://storage.googleapis.com/${bucket.name}/${fileKey}`);

export const getUploadSignedUrl = async (fileKey: string) => {
  const [url] = await bucket.file(fileKey).getSignedUrl({
    action: 'write',
    expires: Date.now() + 20 * 1000, // 20 seconds
    contentType: 'application/octet-stream',
    version: 'v4',
  });

  return url;
};

export const uploadFile = (file: Express.Multer.File, username: string) =>
  new Promise(async (resolve, reject) => {
    const { originalname, buffer } = file;
    const ext = path.extname(originalname).toLowerCase();

    let prediction = Prediction.build({
      filename: originalname,
      inKey: '',
      outKey: '',
      username,
      status: PredictionStatus.PENDING,
    });

    const id = prediction.id;
    const key = `${username}/${id}_in${ext}`;

    prediction.set({ inKey: key, userId: username });

    prediction = await prediction.save();

    const blob = bucket.file(key);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream
      .on('finish', async () => {
        await prediction.updateOne({ status: PredictionStatus.UPLOADED });
        resolve(id);
      })
      .on('error', async (err: unknown) => {
        console.log(err);
        await prediction.updateOne({
          status: PredictionStatus.FAILED_TO_UPLOAD,
        });
        reject(`Unable to upload csv, something went wrong`);
      })
      .end(buffer, async () => {
        // console.log('end');
      });
  });

export const getReadStream = (fileKey: string) => {
  const blob = bucket.file(fileKey);
  const blobStream = blob.createReadStream();
  return blobStream;
};

export const getCSVData = async (fileKey: string) => {
  const blob = bucket.file(fileKey);
  const blobStream = blob.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of blobStream) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  const data = buffer.toString('utf8');
  return data;
};

export const deleteFile = async (fileKey: string) => {
  await bucket.file(fileKey).delete();
};
