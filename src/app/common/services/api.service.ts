import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iLocation } from '../interfaces/location.interface';

@Injectable()
export class ApiService {

  InJoyServerURL = 'https://injoyserver.azurewebsites.net'
  UserName = 'Dão'

  constructor(private http: HttpClient) { }

  getPossibleRoles(location: iLocation): Observable<any> {
    return this.http.get(this.InJoyServerURL + '/possibleRoles', {
      params: { location: JSON.stringify(location) }
    })
  }

  getMyExperiences(): Observable<any> {
    return this.http.get(this.InJoyServerURL + '/myExperiences', {
      params: { user: this.UserName }
    })
  }

  getRoles(): Observable<any> {
    return this.http.get(this.InJoyServerURL + '/roles')
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