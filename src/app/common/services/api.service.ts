import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iMylist, iRole, iExperience } from '../interfaces/injoyApi.interface';
import { iLocation } from '../interfaces/location.interface';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  getCurrentRole(location: iLocation): Promise<any> {
    return new Promise(resolve => {
      let roles: iRole[] = []
      
      for (let i = 0; i < rolesList.length; i++)
          if (Math.abs(rolesList[i].location.latitude - location.latitude) > 0)
            roles.push(rolesList[i])

      resolve(roles)
    })
  }

  getMyList(): Promise<iMylist> {
    return new Promise(resolve => {
      resolve(myList)
    })
  }

  postExperience(experience: iExperience): Promise<null> {
    return new Promise(resolve => {
      myList.myExperiences.experiences.push(experience)
      myList.myExperiences.opened++
      resolve()
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
    pic: "assets/images/bars/ap11.png",
    tags: ['ApDuzGuri', 'zueira', 'tendel']
  },
  {
    name: 'Red Door',
    ratting: 4,
    location: { latitude: -30.041674, longitude: -51.221539 },
    pic: "assets/images/bars/redDoor.jpg",
    tags: ['Pub', 'semiRole', 'games']
  },
  {
    name: 'Void',
    ratting: 3,
    location: { latitude: -30.024672, longitude: -51.203145 },
    pic: "assets/images/bars/void.jpg",
    tags: ['Descolado', 'cevaNaRua', 'generalStore']
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
    experiences: [],
    opened: 0
  }
}