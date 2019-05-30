import { Injectable } from '@angular/core'
import { iExperience } from '../../interfaces/injoyApi.interface';

@Injectable()
export class ExperienceService {
  experience: iExperience = null

  public setExperience(experience: iExperience) {
    this.experience = experience
  }

  public getExperience() {
    return this.experience
  }
}