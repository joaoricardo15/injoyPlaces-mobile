import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../common/services/api.service';
import { CameraService } from '../../common/services/camera.service';
import { GeolocationService } from '../../common/services/geolocation.service';
import { ToastController, AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { iRole, iExperience } from '../../common/interfaces/injoyApi.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageService } from '../../common/services/image.service';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import { ExperienceService } from 'src/app/common/components/experience/experience.service';
import { Location } from '@angular/common';

@Component({
  selector: 'addExperience-page',
  templateUrl: 'addExperience.page.html',
  styleUrls: ['addExperience.page.scss']
})
export class AddExperiencePage {

  currentRoles: iRole[]
  currentRole: iRole
  currentPic: string = 'assets/images/InJoyWoman.png'
  submitted: boolean = false

  name: FormControl
  location: FormControl
  ratting: FormControl
  pic: FormControl
  tag: FormControl
  comment: FormControl
  form: FormGroup

  contentReady: boolean = false

  constructor(
    private router: Router,
    private api: ApiService,
    private image: ImageService,
    private camera: CameraService,
    private toast: ToastController,
    private alert: AlertController,
    private Routerlocation: Location,
    private loading: LoadingController,
    private sheet: ActionSheetController,
    private geoLocation: GeolocationService,
    private localStorage: LocalStorageService,
    private experienceService: ExperienceService) {  }

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.location = new FormControl('', Validators.required);
    this.ratting = new FormControl('' , Validators.required);
    this.pic = new FormControl('');
    this.tag = new FormControl('');
    this.comment = new FormControl('');

    this.form = new FormGroup({
      name: this.name,
      location: this.location,
      ratting: this.ratting,
      pic: this.pic,
      tag: this.tag,
      comment: this.comment
    })
  }

  ionViewWillEnter() {
    if (!this.location.value) {
      this.triggerLoading()
        .then(() => {
          this.addCurrentRole()
            .then(() => {
              this.contentReady = true
            })
            .finally(() => {
              this.loading.dismiss()
            })
        })   
    }
    else {
      this.addCurrentRole()
    }
  }

  ionViewWillLeave() {
    if(this.ratting.value || this.pic.value || this.tag.value || this.comment.value) {
      //this.leaveConfirmationAlert()
    }
  }

  addName()  {
    let name = document.getElementById('nameInput')['value']
    if (name.length > 2)
      this.name.setValue(name) 
  }

  addCurrentRole() {
    return new Promise((resolve, reject) => {
      this.getCurrentRole()
        .then((roles: iRole[]) => {
          if (roles.length > 0) {
            this.currentRoles = roles
            if (this.name.value != roles[0].name) {
              this.name.setValue(roles[0].name)
              this.currentRole = roles[0]
            }
          }
          resolve()
        })
        .catch(() => {
          reject()
          this.router.navigate(['home/myList']) 
          this.triggerToast('Não foi possível determinar os rolês perto de você...', 'danger') 
        })
      })
  }
            
  getCurrentRole() {
    return new Promise((resolve, reject) => {
      this.geoLocation.getCurrentLocation()
        .then(location => {
          this.location.setValue(location)
          this.api.getRolesAround(location)
            .subscribe(roles => {
              resolve(roles)
            })
        })
        .catch(error => { 
          reject()
        })
    })
  }

  addTag()  {
    let tag = document.getElementById('tagInput')['value']
    if (tag.length > 1)
    this.tag.setValue(tag) 
  }

  addComment() {
    let comment = document.getElementById('commentInput')['value']
    if (comment.length > 3)
      this.comment.setValue(comment) 
  }

  addPicture() {
    this.camera.getPicture()
      .then(imageData => { 
        let pic = 'data:image/png;base64,' + imageData
        this.currentPic = pic
        this.pic.setValue(pic) 
      })
      .catch(error => { 
        this.triggerToast('não foi possível acessar a sua câmera', 'danger')
      })
  }

  addExperience(form) {
    if (form.valid)
      this.confirmationAlert()
  }

  resetForm() {
    this.name.setValue(null)
    this.ratting.setValue(null)
    this.pic.setValue(null)
    this.tag.setValue(null)
    this.comment.setValue(null)
    this.currentPic = 'assets/images/InJoyWoman.png'
    this.submitted = false
  }

  async confirmationAlert() {
    const alert = await this.alert.create({
      header: 'Vamo dale!',
      cssClass: 'dark',
      buttons: [
        {
          text: 'voltar',
          role: 'cancel',
        }, {
          text: 'Confirmar',
          handler: () => {
            
            var experience: iExperience = {
              user: this.localStorage.getUser().user,
              name: this.name.value,
              ratting: this.ratting.value,
              location: this.location.value,
              date: new Date(),
              pic: null,
              tag: this.tag.value,
              comment: this.comment.value
            }

            if (this.pic.value) {
              this.image.getBase64ImageFromURL(this.pic.value)
                .subscribe(imgFile => {
                  experience.pic = { data: imgFile, contentType: 'image/png' }
                  this.api.postExperience(experience)
                    .subscribe(() => {
                      this.triggerToast('Experiência salva com sucesso!!!', 'success')
                      this.experienceService.setExperience(experience)
                      this.router.navigate(['home/myExperiences', { update: true }]) 
                    })
                })
            } 
            else {
              this.api.postExperience(experience)
                .subscribe(() => {
                  this.triggerToast('Experiência salva com sucesso!!!', 'success')
                  this.experienceService.setExperience(experience)
                  this.router.navigate(['home/myExperiences', { update: true }])
                })
            }
          }
        }
      ]
    })
    await alert.present()
  }

  async leaveConfirmationAlert() {
    const alert = await this.alert.create({
      header: 'Abortar missão?',
      cssClass: 'dark',
      buttons: [
        {
          text: 'voltar',
          role: 'cancel',
          handler: () => {
            this.Routerlocation.back()
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.resetForm();
          }
        }
      ]
    })
    await alert.present()
  }

  async triggerToast(message: string, color: string) {
    const toast = await this.toast.create({
      message: message,
      color: color,
      duration: 1500
    })
    return await toast.present()
  }

  async triggerLoading() {
    let loadingInstance = await this.loading.create({
      spinner: "crescent",
      message: 'verificando sua localização',
      translucent: true
    })
    return await loadingInstance.present();
  }

  async presentActionSheet(type: string) {
    let sheetObject = {
      header: null,
      buttons: []
    }

    if (type == 'roles') {
      sheetObject.header = 'Rolês perto de você'

      for (let i = 0; i < this.currentRoles.length; i++) {
        sheetObject.buttons.push({
          text: this.currentRoles[i].name,
          role: 'destructive',
          icon: 'pin',
          handler: () => {
            this.name.setValue(this.currentRoles[i].name)
            this.tag.setValue(null)
            this.currentRole = this.currentRoles[i]
          }
        })
      }
    }
    else if (type == 'tags') {
      sheetObject.header = 'Tags mais votadas do rolê'

      for (let i = 0; i < this.currentRole.tags.length; i++) {
        sheetObject.buttons.push({
          text: this.currentRole.tags[i],
          role: 'destructive',
          icon: 'pricetag',
          handler: () => {
            this.tag.setValue(this.currentRole.tags[i])
          }
        })
      }
    }

    sheetObject.buttons.push({
      text: 'voltar',
      icon: 'close',
      role: 'cancel'
    })

    const actionSheet = await this.sheet.create(sheetObject);
    await actionSheet.present()
  }
}
