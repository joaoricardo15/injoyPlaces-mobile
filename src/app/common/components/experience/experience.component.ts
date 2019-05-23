import { Component, Input } from '@angular/core';
import { iExperience } from '../../interfaces/injoyApi.interface';

@Component({
  selector: 'experience',
  templateUrl: 'experience.component.html',
  styleUrls: ['experience.component.scss'],
  entryComponents: []
})
export class ExperienceComponent {

  constructor() {}

  @Input() experience: iExperience
  @Input() columnSize: number = 5
}
