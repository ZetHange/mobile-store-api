import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
const webp = require('webp-converter');

@Injectable()
export class FilesService {
  async createImageFile(file: any): Promise<string> {
    try {
      const fileName = uuid.v4() + '.webp';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        `Произошла ошибка при записи файла, ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
