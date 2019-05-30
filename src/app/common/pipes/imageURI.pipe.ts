import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'imageURI'
})
export class ImageURIPipe implements PipeTransform {
  transform(imgObject: Object): string {
    return 'data:'+imgObject['contentType']+';base64,' + btoa(String.fromCharCode.apply(null, new Uint8Array(imgObject['data']['data'])))
  }
}