import { Component, AfterContentInit } from '@angular/core';
import { ApiService } from '../common/services/api.service';
import { iMyExperiences } from '../common/interfaces/injoyApi.interface';

@Component({
  selector: 'myExperiences-page',
  templateUrl: 'myExperiences.page.html',
  styleUrls: ['myExperiences.page.scss']
})
export class MyExperiencesPage implements AfterContentInit {

  myExperiences: iMyExperiences
  
  constructor(private api: ApiService) { }

  ngAfterContentInit () {
    this.api.getMyList()
    .subscribe(myList => {
      this.myExperiences = myList.myExperiences
    })
  }
}
