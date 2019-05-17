import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InjoyApiService {

  constructor(private http: HttpClient) { }

  postLocations(locations: object[]): Observable<Object> {

    let formatedLocations = []

    for (let i = 0; i < locations.length; i++) {
      formatedLocations.push({
        user: 'daozinho',
        lat: locations[i]['latitude'],
        lng: locations[i]['longitude'],
        timeStamp: locations[i]['time']
      })
    }

    return this.http.post("https://injoyserver.azurewebsites.net/positions", formatedLocations)
  }
}