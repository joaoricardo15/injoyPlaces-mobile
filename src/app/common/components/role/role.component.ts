import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { iRole } from '../../interfaces/injoyApi.interface';
import { RoleService } from './roles.service';

@Component({
  selector: 'role',
  templateUrl: 'role.component.html',
  styleUrls: ['role.component.scss']
})
export class RoleComponent {

  constructor(private roleService: RoleService, private router: Router) {}
  
  @Input() role: iRole
  @Input() columnSize: number = 5

  public navigate(){
    this.roleService.setRole(this.role)
    this.router.navigate(['tabs/role']);
  }
}
