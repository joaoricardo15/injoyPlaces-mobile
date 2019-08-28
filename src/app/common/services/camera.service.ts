import { Injectable } from '@angular/core'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';

@Injectable()
export class CameraService {
  
  private options: CameraOptions

  constructor(private camera: Camera) {
    this.options = {
      quality: 100,
      destinationType: camera.DestinationType.DATA_URL,
      encodingType: camera.EncodingType.PNG,
      mediaType: camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      targetWidth: 426, // já tentei 512 x 288 e não deu :(
    }
  }

  getPicture(camera: boolean) {   
    if (!camera)
      this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY
    else
      this.options.sourceType = this.camera.PictureSourceType.CAMERA

    return this.camera.getPicture(this.options) 
  }

  getBase64ImageFromURL(url: string) {
    return new Observable(observer => {
      // create an image object
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
          // This will call another method that will create image from url
          img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
           observer.error(err);
        };
      } else {
          observer.next(this.getBase64Image(img));
          observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    // We create a HTML canvas object that will create a 2d image
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    // This will draw image    
    ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    var dataURL = canvas.toDataURL("image/png");
    var dataURI = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

    return dataURI
  }
}