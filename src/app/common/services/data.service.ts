import { Injectable } from '@angular/core'
import { ApiService } from './api.service';
import { iMyExperiences, iMylist, iRole } from '../interfaces/injoyApi.interface';
import { iLocation } from '../interfaces/location.interface';
import { Subject } from 'rxjs';

@Injectable()
export class DataService {

  location: iLocation
  rolesAround: iRole[]
  myExperiences: iMyExperiences

  myListObserver = new Subject<iMylist>() 
  rolesAroundObserver = new Subject<object>() 
  myExperiencesObserver = new Subject<iMyExperiences>()

  constructor(private api: ApiService) {}

  getMyList() {
    this.api.getRolesForMe()
      .subscribe((lists: iMylist) => {
        this.myListObserver.next(lists)
      })
  }
  
  getRolesAround() {
    this.api.getRolesAround()
      .subscribe(result => {
        this.location = result.location
        this.rolesAround = result.roles
        this.rolesAroundObserver.next(result)
      })
  }

  getMyExperiences() {
    this.api.getMyExperiences()
      .subscribe((myExperiences: iMyExperiences) => {
        this.myExperiences = myExperiences
        this.myExperiencesObserver.next(myExperiences)
      })
  }
}