import { Component, OnInit, ViewChild } from '@angular/core';
import { iRole, iMylist } from './../../common/interfaces/injoyApi.interface';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { DataService } from './../../common/services/data.service';
import { RoleService } from './../../common/components/role/roles.service';
import { LoadingService } from './../../common/services/loading.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';

@Component({
  selector: 'myList-page',
  templateUrl: 'myList.page.html',
  styleUrls: ['myList.page.scss']
})
export class MyListPage implements OnInit {
  myList: iMylist
  searchOptions: iRole[] = []
  onSearch: boolean = false
  onRefresh: boolean = false
  error: boolean = false

  selectedTabIndex: number = 0

  @ViewChild('slides', null) slides: IonSlides;

  constructor(
    private router: Router,
    private data: DataService,
    private loading: LoadingService,
    private roleService: RoleService,
    private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.myList = this.localStorage.getMyList()

    this.data.getMyList()    
    this.data.myListObserver.subscribe(myList => {
      this.myList = myList
      this.localStorage.setMyList(myList)

      if (!this.myList)
        this.loading.dismiss()

      this.onRefresh = false
    })
    this.data.getRolesAround()
    this.data.getMyExperiences()
  }

  refresh() {
    if (!this.onRefresh) {
      this.onRefresh = true
      this.data.getMyList()
      this.loading.create(null, 500).subscribe(() => {})
    }
  }

  onBlur(input) { 
    input.target.value = ''
    this.searchOptions = this.myList.roles
  }

  ionViewWillEnter() {
    this.onSearch = false
  }

  onSearchInput(input: string) {
    this.onSearch = true
    this.searchOptions = []
    input = input.toLowerCase()
    let roles = this.myList.roles.filter(x => x.name.toLowerCase().includes(input))

    for (let j = 0; j < roles.length; j++) {
      let role = this.searchOptions.find(x => x.name === roles[j].name)
      if (!role) {
        this.searchOptions.push(roles[j])
      }
    }
  }

  selectRole(role: iRole) {
    this.roleService.setRole(role)
    this.router.navigate(['home/role'])
  }
}
