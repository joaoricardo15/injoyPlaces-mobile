import { Component, Input } from '@angular/core';
import { iRoleList, iRole } from '../../interfaces/injoyApi.interface';

@Component({
  selector: 'role-horizontalList',
  templateUrl: 'rolesHorizontalList.component.html',
  styleUrls: ['rolesHorizontalList.component.scss']
})
export class RolesHorizontalListComponent {
  @Input() list: iRoleList
  @Input() roles: iRole[]
}
