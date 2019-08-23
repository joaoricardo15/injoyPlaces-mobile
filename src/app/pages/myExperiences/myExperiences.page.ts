import { Component, OnInit } from '@angular/core';
import { iMyExperiences } from './../../common/interfaces/injoyApi.interface';
import { DataService } from './../../common/services/data.service';
import { LoadingService } from './../../common/services/loading.service';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';

@Component({
  selector: 'myExperiences-page',
  templateUrl: 'myExperiences.page.html',
  styleUrls: ['myExperiences.page.scss']
})
export class MyExperiencesPage implements OnInit {

  myExperiences: iMyExperiences
  achievementsOpened: boolean = false
  statisticsOpened: boolean = false
  experiencesOpened: boolean = false
  onRefresh: boolean = false

  constructor(private data: DataService, private localStorage: LocalStorageService, private loading: LoadingService) { }

  ngOnInit() {
    this.myExperiences = this.localStorage.getMyExperiences()
    this.data.getMyExperiences()
    this.data.myExperiencesObserver.subscribe(myExperiences => {
      if (this.myExperiences) {
        if (this.myExperiences.achievements.length !== myExperiences.achievements.length)
          this.myExperiences.achievements !== myExperiences.achievements

        if (this.myExperiences.statistics.length !== myExperiences.statistics.length)
          this.myExperiences.statistics !== myExperiences.statistics

        if (this.myExperiences.experiences.length !== myExperiences.experiences.length)
          this.myExperiences.experiences !== myExperiences.experiences
      }
      else
        this.myExperiences = myExperiences
      
      this.localStorage.setMyExperiences(myExperiences)

      if (this.loading.isOpened)
        this.loading.dismiss()
      
      this.experiencesOpened = true
      this.onRefresh = false
    })
  }

  ionViewWillEnter() {
    this.experiencesOpened = true
  }

  ionViewWillLeave() {
    this.experiencesOpened = false
  }

  refresh() {
    if (!this.onRefresh) {
      this.onRefresh = true
      this.data.getMyExperiences()
      this.loading.create(null, 500).subscribe(() => {})
    }
  }
}
