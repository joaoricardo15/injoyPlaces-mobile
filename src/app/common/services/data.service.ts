import { Injectable } from '@angular/core'
import { ApiService } from './api.service';
import { iMyExperiences, iMylist, iRole } from '../interfaces/injoyApi.interface';
import { Subject } from 'rxjs';

@Injectable()
export class DataService {

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
        this.rolesAroundObserver.next(result)
      })
  }

  getMyExperiences() {
    this.api.getMyExperiences()
      .subscribe((myExperiences: iMyExperiences) => {
        this.myExperiencesObserver.next(myExperiences)
      })
  }
}