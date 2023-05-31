import { Storage } from '@google-cloud/storage';
import { config } from '../shared/config';

const storage = new Storage({
  projectId: config.gcp.projectId,
  credentials: {
    private_key: config.gcp.privateKey.split(String`\n`).join('\n'),

    client_email: config.gcp.clientEmail,
  },
});

const bucket = storage.bucket(config.gcp.bucketName);

export { storage, bucket };
