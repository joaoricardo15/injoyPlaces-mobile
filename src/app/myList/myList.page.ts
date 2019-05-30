import { Component } from '@angular/core';
import { ApiService } from '../common/services/api.service';
import { iRoleList, iRole } from '../common/interfaces/injoyApi.interface';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'myList-page',
  templateUrl: 'myList.page.html',
  styleUrls: ['myList.page.scss']
})
export class MyListPage {
  myList: iRoleList[]
  searchOptions: iRole[] = []

  constructor(
    private api: ApiService,
    private router: Router,
    private loading: LoadingController) { }

  ionViewWillEnter() {

    this.searchOptions = []
    
    if (this.myList) {
      this.api.getRoles()
        .subscribe((roles: iRole[]) => {
          this.myList = [{ title: 'Todos os rolês', roles: roles }]
        }) 
    }
    else {
      this.triggerLoading()
        .then(() => {
          this.api.getRoles()
            .subscribe((roles: iRole[]) => {
              this.myList = [{ title: 'Todos os rolês', roles: roles }]
              this.loading.dismiss()
            }) 
        })
    }  
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

  async triggerLoading() {
    let loadingInstance = await this.loading.create({
      spinner: "crescent",
      message: 'Carregando rolês pra você',
      translucent: true
    })
    return await loadingInstance.present();
  }
}
