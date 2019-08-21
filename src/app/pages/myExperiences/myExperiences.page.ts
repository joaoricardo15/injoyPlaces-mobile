import { Component, OnInit } from '@angular/core';
import { iMyExperiences } from './../../common/interfaces/injoyApi.interface';
import { DataService } from './../../common/services/data.service';
import { LoadingService } from './../../common/services/loading.service';

@Component({
  selector: 'myExperiences-page',
  templateUrl: 'myExperiences.page.html',
  styleUrls: ['myExperiences.page.scss']
})
export class MyExperiencesPage implements OnInit {

  myExperiences: iMyExperiences
  achievementsOpened: boolean = true
  statisticsOpened: boolean = false
  experiencesOpened: boolean = false
  onRefresh: boolean = false

  constructor(private data: DataService, private loading: LoadingService) { }

  ngOnInit() {
    this.myExperiences = this.data.myExperiences
    this.data.myExperiencesObserver.subscribe(myExperiences => {
      this.onRefresh = false
      this.myExperiences = myExperiences
      this.experiencesOpened = true
    })
  }

  refresh() {
    if (!this.onRefresh) {
      this.onRefresh = true
      this.data.getMyExperiences()
      this.loading.create(null, 500).subscribe(() => {})
    }
  }
}
