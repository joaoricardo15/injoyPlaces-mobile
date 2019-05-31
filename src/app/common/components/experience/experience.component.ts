import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { iExperience } from '../../interfaces/injoyApi.interface';
import { ExperienceService } from './experience.service';

@Component({
  selector: 'experience',
  templateUrl: 'experience.component.html',
  styleUrls: ['experience.component.scss']
})
export class ExperienceComponent {

  constructor(private experienceService: ExperienceService, private router: Router) {}

  @Input() experience: iExperience
  @Input() columnSize: number = 5

  public navigate(){
    this.experienceService.setExperience(this.experience)
    this.router.navigate(['home/experience']);
  }
}
