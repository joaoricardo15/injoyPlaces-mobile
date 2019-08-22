import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Platform, AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class NavigationService {

  constructor(
    private router: Router,
    private location: Location,
    private platform: Platform,
    private alert: AlertController,
    private loading: LoadingController,
    private sheet: ActionSheetController,
    private localStorage: LocalStorageService) { }

  initControllers() {
    this.backButtonControler() 
    this.signUpController()
  }

  signUpController() {
    this.localStorage.getUser() ? this.router.navigate(['/home']) : this.router.navigate(['/signUp'])
  }

  backButtonControler() {
    this.platform.backButton.subscribe( async () => {
      const sheet = await this.sheet.getTop()
      if (sheet) {
        sheet.dismiss()
        return
      }
      const alert = await this.alert.getTop()
      if (alert) {
        alert.dismiss()
        return
      }
      if (this.router.url == '/home/myExperiences' || this.router.url == '/home/addExperience') {
        const loading = await this.loading.getTop()
        if (loading) { 
          loading.dismiss().then(() => {
            this.router.navigate(['/home/myList'])
          })
          return
        }
        else {
          this.router.navigate(['/home/myList'])
          return
        }
      }
      if (this.router.url != '/' && this.router.url != '/home' && this.router.url != '/home/myList' && this.router.url != '/signUp') {
        this.location.back()
      }
    })
  }
}