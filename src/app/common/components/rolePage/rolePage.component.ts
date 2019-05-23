import { Component, Input, OnInit } from '@angular/core';
import { iRole } from '../../interfaces/injoyApi.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'role-page',
  templateUrl: 'rolePage.component.html',
  styleUrls: ['rolePage.component.scss']
})
export class RolePageComponent implements OnInit {
  @Input() role: iRole = {
    name: null,
    ratting: null,
    location: null,
    pic: null,
    tags: null,
  }

  constructor(private router: Router, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.role.name = params.name
      this.role.ratting = params.ratting
      this.role.location = params.location
      this.role.pic = params.pic
      this.role.tags = params.tags.split(',')
    });
  }

  back() {
    this.location.back()
  }
  
}
