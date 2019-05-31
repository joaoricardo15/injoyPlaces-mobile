import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { LocalStorageService } from './common/services/localStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private localStorage: LocalStorageService) { this.initializeApp() }

  ngOnInit() {
    this.localStorage.getUser() ? this.router.navigate(['/home']) : this.router.navigate(['/signUp'])
  }

  initializeApp() {
    this.platform.ready().then((device) => {
      this.splashScreen.hide();
    });
  }
}
