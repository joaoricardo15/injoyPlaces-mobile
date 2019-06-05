import { Injectable } from '@angular/core'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { iLocation } from '../interfaces/location.interface';
import { Observable } from 'rxjs';

@Injectable()
export class GeolocationService {

  constructor(private geoLocation: Geolocation) { }

  getCurrentLocation(): Observable<iLocation>  {
    return new Observable(observer => {
      this.geoLocation.getCurrentPosition()
        .then(location => {
          observer.next({ lat: location.coords.latitude, lng: location.coords.longitude }) 
        })
        .catch(error => { observer.error(error) })
    })
  }
}