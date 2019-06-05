import { Injectable } from '@angular/core'
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {

  constructor(private toast: ToastController) {}

  create(message: string, color?: string) {
    return new Promise(resolve => {
      this.toast.create({
        message: message,
        color: color? color : 'dark',
        duration: 1500
      }).then(toastObject => { toastObject.present().then(() => { resolve() }) })
    })
  }
}