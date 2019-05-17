import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Device } from '@ionic-native/device/ngx'
import { Camera } from '@ionic-native/camera/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { InjoyApiService } from './utils/injoyApi.service';
import { OpenStreepMapService } from './utils/openStreetMap.service';
import { LocalNotificationsService } from './utils/localNotifications.service';
import { BackgroundGeolocationService } from './utils/backgroundGeolocation.service';

import { Autostart } from '@ionic-native/autostart/ngx'
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { BackgroundMode } from '@ionic-native/background-mode/ngx'
import { LocalNotifications } from '@ionic-native/local-notifications/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    InjoyApiService,
    OpenStreepMapService,
    LocalNotificationsService,
    BackgroundGeolocationService,
    Device,
    Camera,
    Autostart,
    Geolocation,
    BackgroundMode,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
