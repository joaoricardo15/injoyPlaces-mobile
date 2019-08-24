import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iUser } from '../interfaces/injoyApi.interface';
import { LocalStorageService } from './localStorage.service';
import { GeolocationService } from './geolocation.service';
import { iLocation } from '../interfaces/location.interface';

@Injectable()
export class ApiService {

  InJoyServerURL = 'https://injoyserver.azurewebsites.net'
  //InJoyServerURL = 'http://127.0.0.1:1000'
  InJoyServerLocationsURL = '/positions'

  constructor(
    private http: HttpClient, 
    private geoLocation: GeolocationService,
    private localStorage: LocalStorageService) { }

  getUser(user: string): Observable<any> {
    return this.http.get(this.InJoyServerURL + '/user', {
      params: { user: user }
    })
  }

  getRolesForMe(): Observable<any> {
    return this.http.get(this.InJoyServerURL + '/rolesForMe', {
      params: { user: this.localStorage.getUser().user }
    })
  }

  getMyLocation(): Observable<any> {
    return this.geoLocation.getCurrentLocation()
  }

  getRolesAround(): Observable<any> {
    return new Observable(observer => {
      navigator.geolocation.getCurrentPosition(location => {
          let locationFormated: iLocation = { lat: location.coords.latitude, lng: location.coords.longitude }
          this.http.get(this.InJoyServerURL + '/rolesAround', {
            params: { location: JSON.stringify(locationFormated) }
          })
          .subscribe(
            roles => { observer.next({ location: locationFormated, roles: roles}) },
            error => { observer.error(error) })
        },
        error => { observer.error(error) })
    })
  }

  getMyExperiences(): Observable<any> {
    return this.http.get(this.InJoyServerURL + '/myExperiences', {
      params: { user: this.localStorage.getUser().user }
    })
  }

  getAddress(location: object) {
    return new Promise(resolve => {
      this.http.get('http://nominatim.openstreetmap.org/reverse?lat='+location['lat']+'&lon='+location['lng']+'&format=json')
        .subscribe(response => {
					resolve(
            (response['address'].road ? response['address'].road + ', ' : '') +
            (response['address'].house_number ? response['address'].house_number + ' - ' : '') + 
            (response['address'].suburb ? response['address'].suburb + ', ' : '') + 
            (response['address'].city ? response['address'].city : ''))
        })
    })
  }

  postUser(user: iUser): Observable<any> {
    return this.http.post(this.InJoyServerURL + '/user', user)
  }

  postExperience(experience: any): Observable<any> {
    return this.http.post(this.InJoyServerURL + '/experience', experience)
  }

  postLocations(locations: object[]): Observable<any> {

    let formatedLocations = []

    for (let i = 0; i < locations.length; i++) {
      formatedLocations.push({
        user: this.localStorage.getUser().user,
        lat: locations[i]['latitude'],
        lng: locations[i]['longitude'],
        timeStamp: locations[i]['time']
      })
    }

    return this.http.post(this.InJoyServerURL + '/positions', formatedLocations)
  }
}