import { Component, OnInit } from '@angular/core';
import { iRole, iMylist } from '../../common/interfaces/injoyApi.interface';
import { Router } from '@angular/router';
import { DataService } from 'src/app/common/services/data.service';
import { LoadingService } from 'src/app/common/services/loading.service';

@Component({
  selector: 'myList-page',
  templateUrl: 'myList.page.html',
  styleUrls: ['myList.page.scss']
})
export class MyListPage implements OnInit {
  myList: iMylist
  searchOptions: iRole[] = []
  error: boolean = false

  constructor(
    private router: Router,
    private data: DataService,
    private loading: LoadingService) { }

  ngOnInit() {
    
    this.loading.create('Carregando rolês pra você')
      .subscribe(() => {
        this.data.myListObserver
          .subscribe(
            (myList: iMylist) => {
              this.myList = myList
              this.loading.dismiss()
            },
            (error) => {
              this.error = true
              this.loading.dismiss()
              //navigator['app'].exitApp();
            })

        this.data.updateAllData()
      })
  }

  onBlur(input) {
    input.target.value = ''
    setTimeout(() => { this.searchOptions = [] })
  }

  onSearchInput(input) {
    this.searchOptions = []
    input = input.target.value.toLowerCase()

    //for (let i = 0; i < this.myList.roles.length; i++) {
      let roles = this.myList.roles.filter(x => x.name.toLowerCase().includes(input))

      for (let j = 0; j < roles.length; j++) {
        let role = this.searchOptions.find(x => x.name === roles[j].name)
        if (!role) {
          this.searchOptions.push(roles[j])
        }
      }
    //}
  }

  selectRole(role: iRole) {
    this.router.navigate(['tabs/role', role]);
  }
}
