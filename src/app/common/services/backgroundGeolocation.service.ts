import { Injectable, OnInit } from '@angular/core'
import { BackgroundGeolocation, BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';
import { ApiService } from './api.service';

@Injectable()
export class BackgroundGeolocationService {

  constructor(private api: ApiService) { }

  startBackgroundGeolocationTracker(user: string) {   
    let config: BackgroundGeolocationConfig = {
      locationProvider: 2,
      desiredAccuracy: 0,
      fastestInterval: 60000,
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
      url: this.api.InJoyServerURL + this.api.InJoyServerLocationsURL,
      httpHeaders: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      postTemplate: {
        user: user,
        lat: '@latitude',
        lng: '@longitude',
        timeStamp: '@time'
      }
    }

    BackgroundGeolocation.configure(config)
      .then(() => { 

        BackgroundGeolocation.checkStatus()
          .then((status) => {
            if (!status.isRunning) {
              BackgroundGeolocation.start().then(() => {
                BackgroundGeolocation.getValidLocations()
                  .then(locations => {
                    if (locations.length > 0) {
                      this.api.postLocations(locations).subscribe(() => {
                        BackgroundGeolocation.deleteAllLocations()
                      })
                    }
                })
              })
            }
          })

        BackgroundGeolocation.finish()
          .then(() => {
            console.log('finalizei')
          })
      })
      .catch(error => { 
        console.log('backgroundGeolocation error: ', error)
      })
  }
}