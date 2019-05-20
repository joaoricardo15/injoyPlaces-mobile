import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iMylist, iRole } from '../interfaces/injoyApi.interface';
import { iLocation } from '../interfaces/location.interface';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  getCurrentRole(location: iLocation) {
    for (let i = 0; i < rolesList.length; i++) {
      if (Math.abs(rolesList[i].location.latitude - location.latitude) > 0)
        return rolesList[i].name
    }
    return null
  }

  getMyList(): Observable<iMylist> {
    return new Observable(observer => {
      observer.next(myList)
    })
  }

  postExperience(role: iRole) {
    return new Observable(observer => {
      rolesList.push(role)
      myList.myExperiences.opened++
      observer.next()
    })
  }

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

const rolesList: iRole[] = [
  {
    name: 'Ap11',
    ratting: 5,
    location: { latitude: -30.039171, longitude: -51.220676 },
    pic: "assets/images/bars/ap11.png"
  },
  {
    name: 'Red Door',
    ratting: 4,
    location: { latitude: -30.041674, longitude: -51.221539 },
    pic: "assets/images/bars/redDoor.jpg"
  },
  {
    name: 'Void',
    ratting: 3,
    location: { latitude: -30.024672, longitude: -51.203145 },
    pic: "assets/images/bars/void.jpg"
  }
]

const myList: iMylist = {
  myList: [
    {
      title: "Novidades",
      roles: rolesList
    },
    {
      title: "Em alta",
      roles: rolesList
    },
    {
      title: "Com a sua cara",
      roles: rolesList
    }
  ],
  myExperiences: {
    roles: rolesList,
    opened: 0
  }
}