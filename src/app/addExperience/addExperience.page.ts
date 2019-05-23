import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../common/services/api.service';
import { CameraService } from '../common/services/camera.service.';
import { GeolocationService } from '../common/services/geolocation.service';
import { ToastController, AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { iRole, iExperience } from '../common/interfaces/injoyApi.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'addExperience-page',
  templateUrl: 'addExperience.page.html',
  styleUrls: ['addExperience.page.scss']
})
export class AddExperiencePage {

  currentRoles: iRole[]
  currentRole: iRole

  name: FormControl
  location: FormControl
  ratting: FormControl
  pic: FormControl
  tag: FormControl

  form: FormGroup

  contetReady: boolean = false

  constructor(
    private router: Router,
    private api: ApiService,
    private camera: CameraService,
    private toast: ToastController,
    private alert: AlertController,
    private loading: LoadingController,
    private sheet: ActionSheetController,
    private geoLocation: GeolocationService) {  }

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.location = new FormControl('', Validators.required);
    this.ratting = new FormControl('' , Validators.required);
    this.pic = new FormControl('assets/images/Homer-icon.png', Validators.required);
    this.tag = new FormControl('', Validators.required);

    this.form = new FormGroup({
      name: this.name,
      location: this.location,
      ratting: this.ratting,
      pic: this.pic,
      tag: this.tag
    })
  }

  onTag()  {
    let tag = document.getElementById('tagInput')['value']
    if (tag.length > 1)
      this.tag.setValue(tag) 
  }

  onName()  {
    let name = document.getElementById('nameInput')['value']
    if (name.length > 1)
      this.name.setValue(name) 
  }

  ionViewWillEnter() {
    this.triggerLoading()
      .then(() => {
        this.geoLocation.getCurrentLocation()
          .then(location => {
            this.location.setValue(location)
            this.api.getCurrentRole(location)
              .then(roles => {
                if (roles.length > 0) {
                  this.currentRoles = roles
                  this.currentRole = roles[0]
                  this.name.setValue(roles[0].name)
                }               
                this.contetReady = true
                this.loading.dismiss()
              })
          })
          .catch(error => { 
            this.triggerToast('geolocationError: '+error) 
          })
      })   
  }

  ionViewWillLeave() {
    this.contetReady = false
  }

  addPicture() {
    this.camera.getPicture()
      .then(imageData => { 
        this.pic.setValue('data:image/jpeg;base64,' + imageData) 
      })
      .catch(error => { 
        this.triggerToast('cameraError: '+error) 
      })
  }

  addExperience(form, valid: boolean) {
    if (valid)
      this.confirmationAlert()
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
            let experience: iExperience = {
              name: this.name.value,
              ratting: this.ratting.value,
              location: this.location.value,
              pic: this.pic.value,
              tag: this.tag.value
            }
        
            this.api.postExperience(experience)
              .then(() => {
                this.name.setValue(null)
                this.ratting.setValue(null)
                this.location.setValue(null)
                this.pic.setValue('assets/images/Homer-icon.png')
                this.tag.setValue(null)
                this.router.navigate(['/tabs/myList']) 
              })
          }
        }
      ]
    })
    await alert.present()
  }

  async triggerToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 1500
    })
    return await toast.present()
  }

  async triggerLoading() {
    let loadingInstance = await this.loading.create({
      spinner: "bubbles",
      message: 'taix por ondi?',
      duration: 5000,
      translucent: true
    })
    return await loadingInstance.present();
  }

  async presentActionSheet(type: string) {
    let buttons = []

    if (type == 'roles') 
      for (let i = 0; i < this.currentRoles.length; i++) {
        buttons.push({
          text: this.currentRoles[i].name,
          role: 'destructive',
          icon: 'pin',
          handler: () => {
            this.name.setValue(this.currentRoles[i].name)
            this.tag.setValue(null)
          }
        })
      }
    else if (type == 'tags')
      for (let i = 0; i < this.currentRole.tags.length; i++) {
        buttons.push({
          text: this.currentRole.tags[i],
          role: 'destructive',
          icon: 'pricetag',
          handler: () => {
            this.tag.setValue(this.currentRole.tags[i])
          }
        })
      }

    buttons.push({
      text: 'Cancel',
      icon: 'close',
      role: 'cancel'
    })

    const actionSheet = await this.sheet.create({
      header: 'Tags mais votadas',
      buttons: buttons
    });
    await actionSheet.present()
  }
}
