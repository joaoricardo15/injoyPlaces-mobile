import { Component, OnInit } from '@angular/core';
import { iMyExperiences } from './../../common/interfaces/injoyApi.interface';
import { DataService } from 'src/app/common/services/data.service';

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

  constructor(private data: DataService) { }

  ngOnInit() {
    this.myExperiences = this.data.myExperiences
    this.data.myExperiencesObserver.subscribe(myExperiences => {
      this.myExperiences = myExperiences
      this.experiencesOpened = true
    })
  }
}
