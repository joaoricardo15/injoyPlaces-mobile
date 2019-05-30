import { Component, OnInit } from '@angular/core';
import { iRole } from '../../interfaces/injoyApi.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RoleService } from '../role/roles.service';

@Component({
  selector: 'role-page',
  templateUrl: 'rolePage.component.html',
  styleUrls: ['rolePage.component.scss']
})
export class RolePageComponent implements OnInit {
  role: iRole = {
    name: null,
    ratting: null,
    location: null,
    address: null,
    pic: null,
    pics: null,
    coments: null,
    tags: null,
  }

  constructor(
    private router: Router,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private location: Location) {} 

  ngOnInit() {
    this.route.params.subscribe(params => {
         this.role = this.roleService.getRole()
    //   this.role.name = params.name
    //   this.role.ratting = params.ratting
    //   this.role.address = params.address
    //   this.role.location = params.location
    //   this.role.pic = params.pic
    //   this.role.pics = params.pics.split(',')
    //   this.role.coments = params.coments.split(',')
    //   this.role.tags = params.tags.split(',')
    });
  }

  back() {
    this.location.back()
  }
}
