import { Injectable } from '@angular/core'
import { ApiService } from './api.service';
import { iRoleList, iMyExperiences, iRole } from '../interfaces/injoyApi.interface';
import { iLocation } from '../interfaces/location.interface';

@Injectable()
export class DataService {

  myList: iRoleList[]
  myLocation: iLocation
  rolesAround: iRole[]
  myExperiences: iMyExperiences

  constructor(private api: ApiService) {}

  getAllData() {

    this.api.getRolesForMe()
      .subscribe((lists: iRoleList[]) => {
        this.myList = lists
      })

    this.api.getRolesAround()
      .subscribe(result => {
        this.myLocation = result.location
        this.rolesAround = result.roles
      })

    this.api.getMyExperiences()
      .subscribe((myExperiences: iMyExperiences) => {
        this.myExperiences = myExperiences
      })
  }
}