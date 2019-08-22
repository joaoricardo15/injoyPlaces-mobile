import { Component, OnInit, ViewChild } from '@angular/core';
import { iRole, iMylist } from './../../common/interfaces/injoyApi.interface';
import { IonSlides } from '@ionic/angular';
import { DataService } from './../../common/services/data.service';
import { LoadingService } from './../../common/services/loading.service';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

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
  error: boolean = false

  selectedTabIndex: number = 0

  @ViewChild('slides', null) slides: IonSlides;

  constructor(
    private data: DataService,
    private loading: LoadingService,
    private splashScreen: SplashScreen,
    private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.myList = this.localStorage.getMyList()

    this.data.getMyList()    
    this.data.myListObserver.subscribe(myList => {
      
      if (this.myList.roles.length !== myList.roles.length)
        this.myList.roles = myList.roles

      if (this.myList.myLists !== myList.myLists)
        this.myList.myLists = myList.myLists

      if (this.loading.isOpened)
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
    if (this.onInit) {
      this.splashScreen.hide()
      this.onInit = false
    }
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
}
