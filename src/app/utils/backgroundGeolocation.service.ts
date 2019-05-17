import { Injectable, OnDestroy } from '@angular/core'
import { BackgroundGeolocation, BackgroundGeolocationEvents, BackgroundGeolocationResponse, BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';
import { OpenStreepMapService } from './openStreetMap.service';
import { InjoyApiService } from './injoyApi.service';

@Injectable()
export class BackgroundGeolocationService {

  public myPosition;
  public myLocal;
  public totalGeolocationUpdates: number = 0;

  constructor(private injoyApi: InjoyApiService, private openStreetMap: OpenStreepMapService) { }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      BackgroundGeolocation.getCurrentLocation()
        .then(position => {
          this.openStreetMap.getMyLocal(position.latitude, position.longitude)
            .subscribe(
              local => { resolve(local['display_name'].split(',')[0]) },
              error => { reject(error)  })
        })
        .catch(error => { reject(error) })
    })
  }

  startBackgroundGeolocationTracker() {   
    BackgroundGeolocation.configure(config)
      .then((response: BackgroundGeolocationResponse) => { 

        BackgroundGeolocation.checkStatus()
          .then((status) => {
            if (!status.isRunning) {
              BackgroundGeolocation.start();
            }
          });

        BackgroundGeolocation.finish()
          .then(() => {
            console.log('finalizei')
          });
      });

    BackgroundGeolocation.getValidLocations()
      .then(locations => {
        if (locations.length > 0) {
          this.injoyApi.postLocations(locations).subscribe(() => {
            BackgroundGeolocation.deleteAllLocations();
          })
        }
    });   
    
    BackgroundGeolocation.on(BackgroundGeolocationEvents.location)
      .subscribe(position => {
        this.myPosition = position
        this.totalGeolocationUpdates++
        this.openStreetMap.getMyLocal(position.latitude, position.longitude)
          .subscribe(local => {
            this.myLocal = local
          });
      });   
  }
}

const config = {
  locationProvider: 2,
  desiredAccuracy: 0,
  interval: 60000,
  fastestInterval: 60000,
  activitiesInterval: 60000,
  stationaryRadius: 1,
  distanceFilter: 1,
  debug: false,
  stopOnTerminate: false,
  startForeground: false, // nao é necessário para rodar em background, basta só stopOnTerminate = false
  pauseLocationUpdates: false,
  saveBatteryOnBackground: false,

  startOnBoot: true, // nao funciona
  notificationsEnabled: false, // nao funciona
  stopOnStillActivity: true, // DEPRECATED segundo a documentacao

  maxLocations: 100,
  notificationTitle: '',
  notificationText: '',
  url: 'https://injoyserver.azurewebsites.net/positions',
  httpHeaders: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  postTemplate: {
    user: 'daozinho',
    lat: '@latitude',
    lng: '@longitude',
    timeStamp: '@time'
  },
}