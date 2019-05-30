import { Injectable } from '@angular/core'
import { iRole } from '../../interfaces/injoyApi.interface';

@Injectable()
export class RoleService {
  role: iRole = null

  public setRole(role: iRole) {
    this.role = role
  }

  public getRole() {
    return this.role
  }
}