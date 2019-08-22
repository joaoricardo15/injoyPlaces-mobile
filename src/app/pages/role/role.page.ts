import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { iRole } from '../../common/interfaces/injoyApi.interface';
import { RoleService } from '../../common/components/role/roles.service';

@Component({
  selector: 'role-page',
  templateUrl: 'role.page.html',
  styleUrls: ['role.page.scss']
})
export class RolePage implements OnInit {
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
