import { Injectable } from '@angular/core'
import { ApiService } from './api.service';
import { iMyExperiences, iMylist } from '../interfaces/injoyApi.interface';
import { iLocation } from '../interfaces/location.interface';
import { Subject } from 'rxjs';

@Injectable()
export class DataService {

  location: iLocation
  myExperiences: iMyExperiences

  myListObserver = new Subject<iMylist>() 
  myExperiencesObserver = new Subject<iMyExperiences>()

  constructor(private api: ApiService) {}

  updateAllData() {
    this.getMyList()
    this.getMyLocation()
    this.getMyExperiences()
  }

  getMyList() {
    this.api.getRolesForMe()
      .subscribe((lists: iMylist) => {
        this.myListObserver.next(lists)
      })
  }

  getMyLocation() {
    this.api.getMyLocation()
      .subscribe((location: iLocation) => {
        this.location = location
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