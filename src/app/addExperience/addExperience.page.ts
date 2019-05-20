import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../common/services/api.service';
import { CameraService } from '../common/services/camera.service.';
import { GeolocationService } from '../common/services/geolocation.service';
import { iLocation } from '../common/interfaces/location.interface';
import { ToastController, AlertController } from '@ionic/angular';
import { iRole } from '../common/interfaces/injoyApi.interface';

@Component({
  selector: 'addExperience-page',
  templateUrl: 'addExperience.page.html',
  styleUrls: ['addExperience.page.scss']
})
export class AddExperiencePage {

  name: string
  location: iLocation
  ratting: number = 1
  pic: string = 'assets/images/Homer-icon.png'
 
  constructor(
    private router: Router,
    private api: ApiService,
    private camera: CameraService,
    private toast: ToastController,
    private alert: AlertController,
    private geoLocation: GeolocationService) {  }

  ionViewWillEnter() {
    this.geoLocation.getCurrentLocation()
      .then(location => {
        this.location = location
        this.name = this.api.getCurrentRole(location)
      })
      .catch(error => { 
        this.triggerToast('geolocationError: '+error) 
      })
  }

  addPicture() {
    this.camera.getPicture()
      .then(imageData => { 
        this.pic = 'data:image/jpeg;base64,' + imageData 
      })
      .catch(error => { 
        this.triggerToast('cameraError: '+error) 
      })
  }

  addExperience(form) {
    if (form && form.value.name)
      this.name = form.value.name

    let role: iRole = {
      name: this.name,
      ratting: this.ratting,
      location: this.location,
      pic: this.pic
    }
    this.api.postExperience(role).subscribe(() => { this.confirmationAlert() }, error => { alert(error) })
  }

  async triggerToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 1500
    })
    return await toast.present()
  }

  async confirmationAlert() {
    const alert = await this.alert.create({
      header: 'Postar experiência?',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
        }, {
          text: 'Confirmar',
          handler: () => {
            this.name = null
            this.ratting = 1
            this.pic = 'assets/images/Homer-icon.png'
            this.router.navigate(['/tabs/myList']) 
          }
        }
      ]
    })
    await alert.present()
  }
}
