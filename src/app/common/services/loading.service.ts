import { Injectable } from '@angular/core'
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {

  isOpened: boolean = false

  constructor(private loading: LoadingController) {}

  create(message?: string, duration?: number) {
    this.isOpened = true;
    return new Promise(resolve => {
      this.loading.create({
        spinner: "crescent",
        message: message ? message : null,
        duration: duration ? duration : null,
        translucent: true
      }).then(loadingObject => { loadingObject.present().then(() => {  resolve() }) })
    })
  }

  dismiss() {
    this.loading.dismiss().then(() => { this.isOpened = false })
  }
}