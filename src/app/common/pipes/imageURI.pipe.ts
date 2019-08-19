import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'imageURI'
})
export class ImageURIPipe implements PipeTransform {
  transform(imgObject: Object): string {
    return imgObject ? 'data:'+imgObject['contentType']+';base64,' +
      btoa(new Uint8Array(imgObject['data']['data'])
        .reduce((data, byte) => {
          return data + String.fromCharCode(byte)
        }, '')) : 'assets/images/InJoyWoman.png'
  }
}