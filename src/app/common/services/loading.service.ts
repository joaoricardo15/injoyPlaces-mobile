import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {

  constructor(private loading: LoadingController) {}

  create(message: string) {
    return new Observable(observer => {
      this.loading.create({
        spinner: "crescent",
        message: message? message : 'Carregando dados pra você',
        translucent: true
      }).then(loadingObject => { loadingObject.present().then(() => { observer.next() }) })
    })
  }

  dismiss() {
    this.loading.dismiss()
  }
}