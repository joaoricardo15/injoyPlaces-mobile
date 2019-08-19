import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {

  isOpened: boolean = false

  constructor(private loading: LoadingController) {}

  create(message: string, duration?: number) {
    return new Observable(observer => {
      this.loading.create({
        spinner: "crescent",
        message: message,
        duration: duration ? duration : null,
        translucent: true
      }).then(loadingObject => { loadingObject.present().then(() => { observer.next(); this.isOpened = true }) })
    })
  }

  dismiss() {
    this.loading.dismiss().then(() => { this.isOpened = false })
  }
}