import { Component, OnInit } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationEvents, BackgroundGeolocationResponse, BackgroundGeolocationConfig, BackgroundGeolocationLocationProvider } from '@ionic-native/background-geolocation';
import { OpenStreepMapService } from '../utils/openStreetMap.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  myPosition;
  myLocal;
  totalGeolocationUpdates: number = 0;

  foreground: number = 0;
  background: number = 0;

  constructor(private openStreetMap: OpenStreepMapService) { }

  ngOnInit() {
    this.startBackgroundGeolocationTracker();
  }

  startBackgroundGeolocationTracker() {

    // distance provider event: mv:false,acy:18.084,v:0.0,df:1
    // activity provider event: acy:16.846,v:0.0   ,  Detected STILL activity
    //syncThreshold: 10, // doesnt work //Specifies how many previously failed locations will be sent to server at once
    //maxLocations: 100, //Limit maximum number of locations stored into db

    // DISTANCE_FILTER_PROVIDER: 0,
    // ACTIVITY_PROVIDER: 1,
    // RAW_PROVIDER: 2
    // HIGH_ACCURACY: 0,
    // MEDIUM_ACCURACY: 100,
    // LOW_ACCURACY: 1000,
    // PASSIVE_ACCURACY: 10000,

    const config = {
      locationProvider: 2,
      desiredAccuracy: 0,
      interval: 1000,
      fastestInterval: 800,
      activitiesInterval: 2000,
      stationaryRadius: 1,
      distanceFilter: 1,
      debug: true,
      saveBatteryOnBackground: false,
      stopOnStillActivity: false,
      stopOnTerminate: false,
      pauseLocationUpdates: false,
      startOnBoot: true,
      startForeground: true,
      notificationsEnabled: false,
      notificationTitle: 'Eh uz Guri',
      notificationText: 'tô pegando teus dados :)',
      maxLocations: 100,
      url: 'http://192.168.0.31/positions',
      httpHeaders: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
      }
    }
    
    BackgroundGeolocation.configure(config)
      .then(() => {

        BackgroundGeolocation.on(BackgroundGeolocationEvents.location)
          .subscribe(position => {
            this.myPosition = position
            this.totalGeolocationUpdates++
            this.openStreetMap.getMyLocal(position.latitude, position.longitude)
              .subscribe(local => {
                this.myLocal = local
              });
          }); 

        BackgroundGeolocation.on(BackgroundGeolocationEvents.foreground)
          .subscribe(() => {
            this.foreground++
          });

        BackgroundGeolocation.on(BackgroundGeolocationEvents.background)
          .subscribe(() => {
            this.background++
          });

        BackgroundGeolocation.getConfig()
          .then(config => {
            //alert('config: ' + JSON.stringify(config)); // funciona
          });

        //BackgroundGeolocation.showLocationSettings() // funciona

        BackgroundGeolocation.on(BackgroundGeolocationEvents.start)
          .subscribe(() => {
            // funciona
          });

        BackgroundGeolocation.on(BackgroundGeolocationEvents.error)
          .subscribe(error => {
            alert('Erro ao resgatar os dados de localização: ' + error['message']); // nunca entrou
          });

        BackgroundGeolocation.on(BackgroundGeolocationEvents.authorization) // nunca entrou
          .subscribe(status => {
            alert('BackgroundGeolocation authorization status: ' + status['authorization']);
          });

        BackgroundGeolocation.on(BackgroundGeolocationEvents.activity) // nunca entrou
          .subscribe(activity => {
            alert('activity: ' + JSON.stringify(activity));
          });

        BackgroundGeolocation.checkStatus()
          .then((status) => {
            if (!status.isRunning) {
              BackgroundGeolocation.start();
            }
          });
      });
  }
}
