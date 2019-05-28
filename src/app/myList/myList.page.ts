import { Component, AfterContentInit } from '@angular/core';
import { ApiService } from '../common/services/api.service';
import { iRoleList, iRole } from '../common/interfaces/injoyApi.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'myList-page',
  templateUrl: 'myList.page.html',
  styleUrls: ['myList.page.scss']
})
export class MyListPage implements AfterContentInit { 
  myList: iRoleList[]
  searchOptions: iRole[] = []

  imageData

  constructor(private api: ApiService, private router: Router) { }

  ionViewWillEnter() {
    this.searchOptions = []

    this.api.getMyListTest().subscribe(myList => {
      
      alert(JSON.stringify(myList['img']))

      var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(myList['img']['data'])));
      this.imageData = 'data:image/png;base64,' + base64String

    })
  }

  ngAfterContentInit () {
    this.api.getMyList()
      .then(myList => {
        this.myList = myList.myList
      })
  }

  onBlur(input) {
    input.target.value = ''
    setTimeout(() => { this.searchOptions = [] })
  }

  onSearchInput(input) {
    this.searchOptions = []
    input = input.target.value.toLowerCase()

    for (let i = 0; i < this.myList.length; i++) {
      let roles = this.myList[i].roles.filter(x => x.name.toLowerCase().includes(input))

      for (let j = 0; j < roles.length; j++) {
        let role = this.searchOptions.find(x => x.name === roles[j].name)
        if (!role) {
          this.searchOptions.push(roles[j])
        }
      }
    }
  }

  selectRole(role: iRole) {
    this.router.navigate(['tabs/role', role]);
  }
}
