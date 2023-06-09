import multer from 'multer';

export const multerMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 500mb.
    fileSize: 1000 * 1024 * 1024 * 5,
  },
  fileFilter: (_req, file, cb) => {
    const filetypes = /csv/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      file.originalname.substring(file.originalname.lastIndexOf('.') + 1)
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type'));
  },
});
