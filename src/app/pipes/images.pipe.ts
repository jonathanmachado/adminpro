import { URL_SERVICES } from './../config/config';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {
  transform(image: string, type: string = 'users'): any {
    let url = URL_SERVICES + 'img';
    if (!image) {
      return url + '/users/xxx';
    }
    if (image.indexOf('https') >= 0) {
      return image;
    }

    switch (type) {
      case 'users':
        url += '/users/' + image;
        break;
      case 'doctors':
        url += '/doctors/' + image;
        break;
      case 'hospitals':
        url += '/hospitals/' + image;

        break;

      default:
        url += '/users/xxx';
        break;
    }
    return url;
  }
}
