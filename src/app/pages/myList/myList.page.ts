import { Component, OnInit, ViewChild } from '@angular/core';
import { iRole, iMylist } from './../../common/interfaces/injoyApi.interface';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { DataService } from './../../common/services/data.service';
import { RoleService } from './../../common/components/role/roles.service';
import { LoadingService } from './../../common/services/loading.service';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'myList-page',
  templateUrl: 'myList.page.html',
  styleUrls: ['myList.page.scss']
})
export class MyListPage implements OnInit {
  myList: iMylist
  searchOptions: iRole[] = []
  onSearch: boolean = false
  onStartSearch: boolean = false
  error: boolean = false

  selectedTabIndex: number = 0

  @ViewChild('slides', null) slides: IonSlides;

  constructor(
    private router: Router,
    private data: DataService,
    private toast: ToastService,
    private roleService: RoleService,
    private loading: LoadingService) { }

  onTabChange(event) {
    if (this.selectedTabIndex !== event.index)
      this.slides.slideTo(event.index)
  }

  onSlideChange() {
    this.slides.getActiveIndex().then(index => { this.selectedTabIndex = index })
  }

  ngOnInit() {
    this.data.myListObserver
      .subscribe(
        (myList: iMylist) => {
          if (!this.myList)
            this.loading.dismiss()
          else if (this.router.url == '/home/myList')
            this.toast.create('rolês atualizados ; )', 'success')

          this.myList = myList
        },
        (error) => {
          this.error = true
          this.loading.dismiss()
        })
    this.data.updateAllData()
    this.loading.create(null, 1000).subscribe(() => {})
  }

  refresh() {
    this.data.getMyList()
    this.loading.create(null, 1000).subscribe(() => {})
  }

  onBlur(input) { 
    input.target.value = ''
    this.searchOptions = this.myList.roles
  }

  ionViewWillEnter() {
    this.onStartSearch = false
    this.onSearch = false
  }

  onSearchInput(input: string) {
    this.onStartSearch = true
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
