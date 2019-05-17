import { Injectable, OnDestroy } from '@angular/core'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable()
export class CameraService {
  
  private options: CameraOptions

  constructor(private camera: Camera) {
    this.options = {
      quality: 100,
      destinationType: camera.DestinationType.DATA_URL,
      encodingType: camera.EncodingType.JPEG,
      mediaType: camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      targetWidth: 200,
      targetHeight: 200
    }
  }

  takePicture() {   
    return this.camera.getPicture(this.options) 
  }
}

