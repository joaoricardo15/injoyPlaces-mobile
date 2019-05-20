import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { BackgroundGeolocationService } from './common/services/backgroundGeolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private backgroundGeolocation: BackgroundGeolocationService
    ) {
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then((device) => {
      this.splashScreen.hide();
      this.backgroundGeolocation.startBackgroundGeolocationTracker();
    });
  }
}
