import { Component, Input } from '@angular/core';
import { iRole } from '../../interfaces/injoyApi.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'role',
  templateUrl: 'role.component.html',
  styleUrls: ['role.component.scss']
})
export class RoleComponent {

  constructor(public router: Router) {}
  
  @Input() role: iRole
  @Input() columnSize: number = 5

  public navigate(){
    this.router.navigate(['tabs/role', this.role]);
  }
}
