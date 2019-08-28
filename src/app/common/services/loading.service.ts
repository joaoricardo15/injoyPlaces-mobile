import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {

  isOpened: boolean = false

  constructor(private loading: LoadingController) {}

  create(message?: string, duration?: number) {
    
    return new Promise(resolve => {
      this.loading.create({
        spinner: "crescent",
        message: message ? message : null,
        duration: duration ? duration : null,
        translucent: true
      }).then(loadingObject => { this.isOpened = true; loadingObject.present().then(() => {  resolve() }) })
    })
  }

  dismiss() {
    this.loading.dismiss().then(() => { this.isOpened = false })
  }
}