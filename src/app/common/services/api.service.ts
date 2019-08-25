import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iUser, iLocation, iAddress } from '../interfaces/injoyApi.interface';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class ApiService {

  InJoyServerURL = 'https://injoyserver.azurewebsites.net'
  //InJoyServerURL = 'http://127.0.0.1:1000'
  //InJoyServerURL = 'http://192.168.0.22:1000'
  InJoyServerLocationsURL = '/positions'

  constructor(
    private http: HttpClient, 
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

  getAddressFromLocation(location: iLocation): Promise<iAddress> {
    return new Promise(resolve => {
      this.http.get('http://nominatim.openstreetmap.org/reverse?format=json&lat='+location.lat+'&lon='+location.lng+'')
        .subscribe(response => {
          resolve({
            street: response['address'].road ? response['address'].road : null,
            number: response['address'].house_number ? response['address'].house_number : null,
            suburb: response['address'].suburb ? response['address'].suburb : null,
            city: response['address'].city ? response['address'].city : null,
            state: response['address'].state ? response['address'].state : null,
            country: response['address'].country ? response['address'].country : null
          })
        })
    })
  }

  getLocationFromAddress(address: iAddress): Promise<iLocation> {
    return new Promise(resolve => {
      this.http.get('http://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=' + 
        address.street.replace(' ', '+') + '+' + 
        address.number + '+' + 
        address.city.replace(' ', '+') + '+' + 
        address.state.replace(' ', '+') + '+' + 
        address.country.replace(' ', '+'))
        .subscribe(response => {
          resolve({lat: response[0].lat, lng: response[0].lon })
        })
    })
  }

  getAddress(location: iLocation): Promise<iAddress> {
    return this.getAddressFromLocation(location)
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