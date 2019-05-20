import { Injectable, OnInit } from '@angular/core'
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications/ngx';

@Injectable()
export class LocalNotificationsService implements OnInit {

  id: number = 1

  constructor(private localNotifications: LocalNotifications) { }

  ngOnInit() {

    // não consegui fazer funcionar
    // this.localNotifications.addActions('yes-no', [
    //   { id: 'yes', title: 'Vamo dale' },
    //   { id: 'no',  title: 'não eras'  }
    // ]).then(() => {
    //   this.localNotifications.setDefaults({
    //     vibrate: false,
    //     led: { color: '#ff0', on: 500, off: 500 },
    //     silent: true,
    //     actions: 'yes-no'
    //   })
    // });
  }

  emitNotification(title: string, text: string, callback?: Function) {
    var yes = this.localNotifications.on('yes').subscribe(() => {
      yes.unsubscribe()
      if (callback) callback()
    })

    this.localNotifications.schedule({
      id: this.id,
      title: title,
      text: text,
      vibrate: false,
      //sound: '', // nao testei com arquivo real
      //silent: true, // if true, simplesmente nao mostra nada
      launch: false,
      foreground: true,
      actions: [
        { id: 'yes', title: 'Vamo dale' }
      ]
    })

    this.id++
  }
}