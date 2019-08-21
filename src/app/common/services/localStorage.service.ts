import { Injectable } from '@angular/core';
import { iUser, iMylist } from './../interfaces/injoyApi.interface';

@Injectable()
export class LocalStorageService {

  getUser(): iUser {
    return JSON.parse(localStorage.getItem('user'))
  }

  setUser(user: iUser) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getMyList(): iMylist {
    return JSON.parse(localStorage.getItem('myList'))
  }

  setMyList(mylist: iMylist) {
    localStorage.setItem('myList', JSON.stringify(mylist))
  }
}
