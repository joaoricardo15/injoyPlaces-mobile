import { Component, Input, OnInit } from '@angular/core';
import { iExperience } from '../../interfaces/injoyApi.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'experience-page',
  templateUrl: 'experiencePage.component.html',
  styleUrls: ['experiencePage.component.scss']
})
export class ExperiencePageComponent implements OnInit {
  @Input() experience: iExperience = {
    name: null,
    ratting: null,
    location: null,
    date: null,
    pic: null,
    tag: null,
  }

  constructor(private router: Router, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.experience.name = params.name
      this.experience.ratting = params.ratting
      this.experience.location = params.location
      this.experience.date = params.date
      this.experience.pic = params.pic
      this.experience.tag = params.tag
    });
  }

  back() {
    this.location.back()
  }
}
