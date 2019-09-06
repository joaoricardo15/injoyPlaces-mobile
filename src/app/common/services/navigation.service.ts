import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Platform, AlertController, ActionSheetController } from '@ionic/angular';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class NavigationService {

  constructor(
    private router: Router,
    private location: Location,
    private platform: Platform,
    private alert: AlertController,
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
    this.platform.backButton.subscribe(async () => {
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
      if (this.router.url == 'home/role' || this.router.url == 'home/addExperience' || this.router.url == 'home/myExperiences' || this.router.url == 'home/experience') {
        this.location.back()
      }
    })
  }
}