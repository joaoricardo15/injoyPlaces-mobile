import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { iExperience } from '../../common/interfaces/injoyApi.interface';
import { ExperienceService } from '../../common/components/experience/experience.service';

@Component({
  selector: 'experience-page',
  templateUrl: 'experience.page.html',
  styleUrls: ['experience.page.scss']
})
export class ExperiencePage implements OnInit {
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
