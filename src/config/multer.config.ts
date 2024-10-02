import * as path from 'path';
import * as multer from 'multer';

export const multerConfig = {
  storage: multer.diskStorage({
    destination(req, file, callback) {
      return callback(null, './uploads');
    },
    filename: function (req, file, cb) {
      const extName = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + extName);
    },
  }),
};
