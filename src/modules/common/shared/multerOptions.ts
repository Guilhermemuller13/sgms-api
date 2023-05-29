import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const multerConfig = {
  dest: process.env.UPLOAD_LOCATION_PRODUCTS,
  fileSize: +process.env.MAX_FILE_SIZE,
};

const fileFilter = (req, file, cb) => {
  if (existsSync(join('storage/products', file.originalname))) {
    console.log('skipped');
    cb(null, false);
    return;
  }

  cb(null, true);
};

export const multerOptions: MulterOptions = {
  limits: {
    fileSize: multerConfig.fileSize,
  },
  fileFilter: (req, file, cb) => {
    const fileExist = existsSync(join(multerConfig.dest, file.originalname));

    console.log({ fileExist });

    if (fileExist) {
      cb(null, false);
      return;
    }

    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(
        new BadRequestException(
          `Unsupported file type ${extname(file.originalname)}`,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = multerConfig.dest;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};
