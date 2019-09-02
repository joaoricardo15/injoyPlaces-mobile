import { Component, OnInit } from '@angular/core';
import { iMyExperiences, iExperience, iRole } from './../../common/interfaces/injoyApi.interface';
import { DataService } from './../../common/services/data.service';
import { LoadingService } from './../../common/services/loading.service';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import { ExperienceService } from 'src/app/common/components/experience/experience.service';
import { Router } from '@angular/router';

@Component({
  selector: 'myExperiences-page',
  templateUrl: 'myExperiences.page.html',
  styleUrls: ['myExperiences.page.scss']
})
export class MyExperiencesPage implements OnInit {

  myExperiences: iMyExperiences
  achievementsOpened: boolean = false
  statisticsOpened: boolean = false
  experiencesOpened: boolean = true
  onRefresh: boolean = false

  constructor(
    private data: DataService,
    private router: Router,
    private loading: LoadingService,
    private localStorage: LocalStorageService,
    private experienceService: ExperienceService) { }

  ngOnInit() {
    this.myExperiences = this.localStorage.getMyExperiences()
    this.data.getMyExperiences()
    this.data.myExperiencesObserver.subscribe(myExperiences => {
      this.myExperiences = myExperiences

      this.localStorage.setMyExperiences(myExperiences)
      
      this.experiencesOpened = true
      this.onRefresh = false
    })
  }
  
  refresh() {
    if (!this.onRefresh) {
      this.onRefresh = true
      this.data.getMyExperiences()
      this.loading.create(null, 500)
    }
  }

  public navigate(experience: iExperience) {
    this.experienceService.setExperience(experience)
    this.router.navigate(['home/experience']);
  }
}
