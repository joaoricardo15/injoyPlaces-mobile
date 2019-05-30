import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { iExperience } from '../../interfaces/injoyApi.interface';
import { ExperienceService } from '../experience/experience.service';

@Component({
  selector: 'experience-page',
  templateUrl: 'experiencePage.component.html',
  styleUrls: ['experiencePage.component.scss']
})
export class ExperiencePageComponent implements OnInit {
  experience: iExperience

  constructor(
    private experienceService: ExperienceService,
    private route: ActivatedRoute,
    private location: Location) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.experience = this.experienceService.getExperience()
    });
  }

  back() {
    this.location.back()
  }
}
