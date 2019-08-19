import { Component, OnInit } from '@angular/core';
import { iMyExperiences } from './../../common/interfaces/injoyApi.interface';
import { DataService } from 'src/app/common/services/data.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'myExperiences-page',
  templateUrl: 'myExperiences.page.html',
  styleUrls: ['myExperiences.page.scss']
})
export class MyExperiencesPage implements OnInit {

  myExperiences: iMyExperiences

  achievements = [
    {
      title: 'roles',
      icon: 'trophy'
    }, 
    {
      title: 'descobertas',
      icon: 'pin'
    },
    {
      title: 'bares',
      icon: 'beer'
    },
    {
      title: 'restaurantes',
      icon: 'restaurant'
    }
  ]

  constructor(private data: DataService) { }

  ngOnInit() {
    this.myExperiences = this.data.myExperiences

    this.data.myExperiencesObserver.subscribe(myExperiences => {
      this.myExperiences = myExperiences
    })
  }
}
