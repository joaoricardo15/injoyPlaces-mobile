import { Injectable } from '@angular/core';
import { iUser } from './../interfaces/injoyApi.interface';

@Injectable()
export class LocalStorageService {

  getUser(): iUser {
    return JSON.parse(localStorage.getItem('user'))
  }

  setUser(user: iUser) {
    localStorage.setItem('user', JSON.stringify(user))
  }
}
