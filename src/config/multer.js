import multer from 'multer';
import { extname, resolve } from 'path';
import crypto from 'crypto';

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req, file, cb) => {
            return cb(
                null,
                crypto.randomBytes(16).toString('hex') +
                    extname(file.originalname)
            );
        },
    }),
};
