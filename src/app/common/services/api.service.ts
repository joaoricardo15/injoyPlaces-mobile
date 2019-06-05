import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iUser } from '../interfaces/injoyApi.interface';
import { LocalStorageService } from './localStorage.service';
import { GeolocationService } from './geolocation.service';

@Injectable()
export class ApiService {

  InJoyServerURL = 'https://injoyserver.azurewebsites.net'
  //InJoyServerURL = 'http://localhost:1000'

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
      this.getMyLocation()
        .subscribe(
          location => {
            this.http.get(this.InJoyServerURL + '/rolesAround', {
              params: { location: JSON.stringify(location) }
            })
            .subscribe(
              roles => { observer.next({ location: location, roles: roles}) },
              error => { observer.error() })
          },
          error => { observer.error() })
    })
  }

  getMyExperiences(): Observable<any> {
    return this.http.get(this.InJoyServerURL + '/myExperiences', {
      params: { user: this.localStorage.getUser().user }
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
        user: 'daozinho',
        lat: locations[i]['latitude'],
        lng: locations[i]['longitude'],
        timeStamp: locations[i]['time']
      })
    }

    return this.http.post(this.InJoyServerURL + '/positions', formatedLocations)
  }
}