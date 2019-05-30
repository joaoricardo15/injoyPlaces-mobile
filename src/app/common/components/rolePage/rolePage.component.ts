import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { iRole } from '../../interfaces/injoyApi.interface';
import { RoleService } from '../role/roles.service';

@Component({
  selector: 'role-page',
  templateUrl: 'rolePage.component.html',
  styleUrls: ['rolePage.component.scss']
})
export class RolePageComponent implements OnInit {
  role: iRole

  constructor(
    private roleService: RoleService,
    private route: ActivatedRoute,
    private location: Location) {} 

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.role = this.roleService.getRole()
    });
  }

  back() {
    this.location.back()
  }
}
