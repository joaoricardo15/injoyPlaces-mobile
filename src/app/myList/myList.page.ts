import { Component, AfterContentInit } from '@angular/core';
import { ApiService } from '../common/services/api.service';
import { iRoleList, iRole } from '../common/interfaces/injoyApi.interface';
import { Router } from '@angular/router';
import { ImageService } from '../common/services/image.service';

@Component({
  selector: 'myList-page',
  templateUrl: 'myList.page.html',
  styleUrls: ['myList.page.scss']
})
export class MyListPage implements AfterContentInit { 
  myList: iRoleList[]
  searchOptions: iRole[] = []

  imageData

  constructor(private api: ApiService, private image: ImageService, private router: Router) { }

  ionViewWillEnter() {
    this.searchOptions = []

    this.api.getMyListTest().subscribe(myList => {

      this.imageData = this.image.getURLFromImageFile(myList['img']['data']['data'], myList['img']['contentType'])

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
