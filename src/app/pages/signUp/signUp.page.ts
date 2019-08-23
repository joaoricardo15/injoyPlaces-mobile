import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/common/services/api.service';
import { ToastController } from '@ionic/angular';
import { LoadingService } from 'src/app/common/services/loading.service';
import { BackgroundGeolocationService } from 'src/app/common/services/backgroundGeolocation.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'signUp-page',
  templateUrl: 'signUp.page.html',
  styleUrls: ['signUp.page.scss']
})
export class SignUpPage implements OnInit {

  constructor(
    private router: Router,
    private api: ApiService,
    private toast: ToastController,
    private loading: LoadingService,
    private splashScreen: SplashScreen, 
    private localStorage: LocalStorageService,
    private geolocation: BackgroundGeolocationService) {}

  user: any
  email: any
  submitted: boolean = false
  alreadyInUse: boolean = false
  alreadyInUseName: string

  ngOnInit() {
    this.splashScreen.hide()
  }

  signUp(form) {
    this.submitted = true

    if (form.valid) {
      this.api.getUser(form.value.user)
        .subscribe(users => {
          if (users.length == 0) {
            this.api.postUser(form.value)
              .subscribe(() => {
                this.localStorage.setUser(form.value)
                this.triggerToast('Inscrição realizada com sucesso!!!')
                this.router.navigate(['/home'])
                this.loading.create().subscribe(() => {})
              })
          }
          else {
            this.alreadyInUse = true
            this.alreadyInUseName = users[0].user
          }
        })
    }
  }

  async triggerToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      color: "success",
      duration: 2000
    })
    return await toast.present()
  }
}
