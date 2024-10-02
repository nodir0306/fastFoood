"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const path = require("path");
const multer = require("multer");
exports.multerConfig = {
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
//# sourceMappingURL=multer.config.js.map