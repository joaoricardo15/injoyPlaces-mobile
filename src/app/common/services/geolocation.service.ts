import { Injectable } from '@angular/core'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { iLocation } from '../interfaces/location.interface';

@Injectable()
export class GeolocationService {

  constructor(private geoLocation: Geolocation) { }

  getCurrentLocation(): Promise<iLocation>  {
    return new Promise((resolve, reject) => {
      this.geoLocation.getCurrentPosition()
        .then(location => {
          resolve({ latitude: location.coords.latitude, longitude: location.coords.latitude }) 
        })
        .catch(error => { reject(error) })
    })
  }
}