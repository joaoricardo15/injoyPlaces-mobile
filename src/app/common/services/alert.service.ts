import { Injectable } from '@angular/core'
import { AlertController } from '@ionic/angular';
import { iAddress } from '../interfaces/injoyApi.interface';

@Injectable()
export class AlertService {

  constructor(private alert: AlertController) {}

  createConfirmation(message: string, confirmText?: string, cancelText?: string): Promise<boolean> {
    return new Promise(resolve => {
      this.alert.create({
        header: message,
        buttons: [{
            text: cancelText ? cancelText : 'Cancelar',
            role: 'cancel',
            handler: () => { resolve(false) }
          }, {
            text: confirmText ? confirmText : 'Confirmar',
            handler: () => { resolve(true) }
          }]
      }).then(alertObject => { alertObject.present() })
    })
  }

  createInformation(header: string, message?: string): Promise<null> {
    return new Promise(resolve => {
      this.alert.create({
        header: header,
        message: message ? message : null,
        buttons: [{
            text: 'Ok',
            role: 'cancel',
            handler: () => { resolve() }
          }]
      }).then(alertObject => { alertObject.present() })
    })
  }

  createAddressForm(): Promise<iAddress> {
    return new Promise(resolve => {
      this.alert.create({
        header: 'Endereço',
        inputs: [
          {
            name: 'street',
            type: 'text',
            placeholder: 'Rua',
          },
          {
            name: 'number',
            type: 'text',
            placeholder: 'Número',
          },
          {
            name: 'complement',
            type: 'text',
            placeholder: 'Complemento',
          },
          {
            name: 'suburb',
            type: 'text',
            placeholder: 'Bairro',
          },
          {
            name: 'city',
            type: 'text',
            placeholder: 'Cidade',
          },
          {
            name: 'state',
            type: 'text',
            placeholder: 'Estado',
          },
          {
            name: 'country',
            type: 'text',
            placeholder: 'País',
          },
        ],
        buttons: [
          {
            text: 'Confirmar',
            handler: (data: iAddress) => {
              resolve(data)
            }
          }
        ]
      }).then(alertObject => { alertObject.present() })
    })
  }
}