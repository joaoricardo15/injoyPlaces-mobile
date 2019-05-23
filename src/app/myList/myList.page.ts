import { Component, AfterContentInit } from '@angular/core';
import { ApiService } from '../common/services/api.service';
import { iRoleList } from '../common/interfaces/injoyApi.interface';

@Component({
  selector: 'myList-page',
  templateUrl: 'myList.page.html',
  styleUrls: ['myList.page.scss']
})
export class MyListPage implements AfterContentInit { 
  myList: iRoleList[]
  
  constructor(private api: ApiService) { }

  ngAfterContentInit () {
    this.api.getMyList()
      .then(myList => {
        this.myList = myList.myList
      })
  }

  segmentChanged() {

  }
}
