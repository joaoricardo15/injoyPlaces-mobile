import { Component, OnInit, ViewChild } from '@angular/core';
import { iRole, iMylist } from './../../common/interfaces/injoyApi.interface';
import { IonSlides } from '@ionic/angular';
import { DataService } from './../../common/services/data.service';
import { LoadingService } from './../../common/services/loading.service';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { RoleService } from 'src/app/common/components/role/roles.service';
import { Router } from '@angular/router';
import { BackgroundGeolocationService } from 'src/app/common/services/backgroundGeolocation.service';

@Component({
  selector: 'myList-page',
  templateUrl: 'myList.page.html',
  styleUrls: ['myList.page.scss']
})
export class MyListPage implements OnInit {
  myList: iMylist
  searchOptions: iRole[] = []
  onInit: boolean = true
  onSearch: boolean = false
  onRefresh: boolean = false

  selectedTabIndex: number = 0

  @ViewChild('slides', null) slides: IonSlides;

  constructor(
    private data: DataService,
    private router: Router,
    private loading: LoadingService,
    private roleService: RoleService,
    private splashScreen: SplashScreen,
    private localStorage: LocalStorageService,
    private geolocation: BackgroundGeolocationService) { }

  ngOnInit() {
    this.myList = this.localStorage.getMyList()
    this.data.getMyList()    
    this.data.myListObserver.subscribe(myList => {
      if (this.myList) {

        if (this.myList.roles.length !== myList.roles.length)
          this.myList.roles = myList.roles
        else
          for (let i = 0; i < this.myList.roles.length; i++)
            if (this.myList.roles[i].ratting.rattings !== myList.roles[i].ratting.rattings ||
              this.myList.roles[i].occasions.length !== myList.roles[i].occasions.length ||
              this.myList.roles[i].tags.length !== myList.roles[i].tags.length ||
              this.myList.roles[i].pics.length !== myList.roles[i].pics.length || 
              this.myList.roles[i].comments.length !== myList.roles[i].comments.length)
              this.myList.roles[i] = myList.roles[i]

        if (this.myList.myLists !== myList.myLists)
          this.myList.myLists = myList.myLists
      }
      else
        this.myList = myList
      
      this.localStorage.setMyList(myList)

      if (this.loading.isOpened)
        this.loading.dismiss()
      
      this.onRefresh = false
    })
    this.data.getRolesAround()
    this.geolocation.startBackgroundGeolocationTracker(this.localStorage.getUser().user);
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
    if (this.onInit) {
      this.splashScreen.hide()
      this.onInit = false
    }
    this.onSearch = false
  }

  navigate(role: iRole) {
    this.roleService.setRole(role)
    this.router.navigate(['home/role'])
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
}
