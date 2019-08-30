import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { iUser, iLocation, iAddress } from '../interfaces/injoyApi.interface';
import { LocalStorageService } from './localStorage.service';
import { AlertService } from './alert.service';

@Injectable()
export class ApiService {

  InJoyServerURL = 'http://injoyserver-env.x2mviib6hg.us-east-1.elasticbeanstalk.com'
  //InJoyServerURL = 'https://injoyserver.azurewebsites.net'
  //InJoyServerURL = 'http://127.0.0.1:1000'
  //InJoyServerURL = 'http://192.168.0.22:1000'
  InJoyServerLocationsURL = '/positions'

  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private localStorage: LocalStorageService) { }

  get(url: string, params): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.InJoyServerURL + url, { params: params }).subscribe(
        result => {
          resolve(result)
        }, error => {
          this.errorHandler('não foi possível atualizar os dados : (')
        })
    })
  }

  post(url: string, body): Promise<any> {
    return new Promise(resolve => {
      this.http.post(this.InJoyServerURL + url, body).subscribe(
        result => {
          resolve(result)
        }, error => {
          //this.errorHandler('não foi possível postar os dados : (')
        })
    })
  }

  errorHandler(message: string) {
    this.alert.createInformation(message)
  }

  getUser(user: string): Promise<any> {
    return this.get('/user', { user: user })
  }

  getRolesForMe(): Promise<any> {
    return this.get('/rolesForMe', { user: this.localStorage.getUser().user })
  }

  getRolesAround(): Promise<any> {
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(location => {
          let locationFormated: iLocation = { lat: location.coords.latitude, lng: location.coords.longitude }
          this.get('/rolesAround', { location: JSON.stringify(locationFormated) })
          .then(roles => { resolve({ location: locationFormated, roles: roles}) })
        },
        error => { this.errorHandler('não foi possível obter a sua localização : (') })
    })
  }

  getMyExperiences(): Promise<any> {
    return this.get('/myExperiences', { user: this.localStorage.getUser().user })
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
        },
        error => {
          //this.errorHandler('não foi possível determinar o seu endereço : (')
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
        }, error => {
          this.errorHandler('não foi possível determinar a localização a partir do endereço solicitado : (')
        })
    })
  }

  getAddress(location: iLocation): Promise<iAddress> {
    return this.getAddressFromLocation(location)
  }

  postUser(user: iUser): Promise<any> {
    return this.post('/user', user)
  }

  postExperience(experience: any): Promise<any> {
    return this.post('/experience', experience)
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