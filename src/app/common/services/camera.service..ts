import { Injectable } from '@angular/core'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable()
export class CameraService {
  
  private options: CameraOptions

  constructor(private camera: Camera) {
    this.options = {
      quality: 100,
      destinationType: camera.DestinationType.DATA_URL,
      encodingType: camera.EncodingType.PNG,
      mediaType: camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      targetWidth: 200,
      targetHeight: 200
    }
  }

  getPicture() {   
    return this.camera.getPicture(this.options) 
  }
}

