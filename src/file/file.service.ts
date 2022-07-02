import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from "path";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

export enum fileType {
  AUDIO = "audio",
  PICTURE = "picture"
}

@Injectable()
export class FileService {

  createFile(type: fileType, file): string {
    try {
      const fileExtention = file.originalname.split('.').pop();
      const fileName = uuidv4() + '.' + fileExtention;
      const filePath = path.resolve(__dirname, '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true});
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return `${type}/${fileName}`;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(file) {
    if (file) {
      try {
        const filePath = path.resolve(__dirname, '..', 'static', file);
        if (filePath) {
          fs.unlinkSync(filePath);
        }
      } catch (e) {
        throw  new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
