import { Component, Input } from '@angular/core';
import { iRole } from '../../interfaces/injoyApi.interface';

@Component({
  selector: 'role',
  templateUrl: 'role.component.html',
  styleUrls: ['role.component.scss']
})
export class RoleComponent {
  @Input() role: iRole
  @Input() columnSize: number = 5

}
