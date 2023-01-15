import { Pipe, PipeTransform } from '@angular/core';
import {makeDefaultImagePath} from '../functions/core.function';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: any, folder: string = ''): any {
    if (folder !== '') {
      folder += '/';
    }
    return makeDefaultImagePath(folder + value);
  }

}
