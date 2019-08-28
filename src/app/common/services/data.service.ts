import { Injectable } from '@angular/core'
import { ApiService } from './api.service';
import { iMyExperiences, iMylist } from '../interfaces/injoyApi.interface';
import { Subject } from 'rxjs';

@Injectable()
export class DataService {

  myListObserver = new Subject<iMylist>() 
  rolesAroundObserver = new Subject<object>() 
  myExperiencesObserver = new Subject<iMyExperiences>()

  constructor(private api: ApiService) {}

  getMyList() {
    this.api.getRolesForMe()
      .then((lists: iMylist) => {
        this.myListObserver.next(lists)
      })
  }
  
  getRolesAround() {
    this.api.getRolesAround()
      .then(result => {
        this.rolesAroundObserver.next(result)
      })
  }

  getMyExperiences() {
    this.api.getMyExperiences()
      .then((myExperiences: iMyExperiences) => {
        this.myExperiencesObserver.next(myExperiences)
      })
  }
}