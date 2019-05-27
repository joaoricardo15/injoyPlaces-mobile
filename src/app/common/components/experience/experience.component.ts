import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { iExperience } from '../../interfaces/injoyApi.interface';

@Component({
  selector: 'experience',
  templateUrl: 'experience.component.html',
  styleUrls: ['experience.component.scss']
})
export class ExperienceComponent {

  constructor(public router: Router) {}

  @Input() experience: iExperience
  @Input() columnSize: number = 5

  public navigate(){
    this.router.navigate(['tabs/experience', this.experience]);
  }
}
