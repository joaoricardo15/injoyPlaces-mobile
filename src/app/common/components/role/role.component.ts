import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { iRole } from '../../interfaces/injoyApi.interface';

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
