import { Injectable } from '@angular/core'
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable()
export class AlertService {

  constructor(private alert: AlertController) {}

  create(message?: string): Observable<boolean> {
    return new Observable(observer => {
      this.alert.create({
        header: message? message : 'Abortar a missão?',
        buttons: [{
            text: 'Cancelar',
            role: 'cancel',
            handler: () => { observer.next(false) }
          }, {
            text: 'Confirmar',
            handler: () => { observer.next(true) }
          }]
      }).then(alertObject => { alertObject.present() })
    })
  }
}