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
    private loading: LoadingController,
    private sheet: ActionSheetController,
    private geoLocation: GeolocationService,
    private localStorage: LocalStorageService) {  }

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.location = new FormControl('', Validators.required);
    this.ratting = new FormControl('' , Validators.required);
    this.pic = new FormControl('');
    this.tag = new FormControl('', Validators.required);
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
    this.triggerLoading()
      .then(() => {
        this.geoLocation.getCurrentLocation()
          .then(location => {
            this.location.setValue(location)
            this.api.getRolesAround(location)
              .subscribe(roles => {
                if (roles.length > 0) {
                  this.currentRoles = roles
                  this.currentRole = roles[0]
                  this.name.setValue(roles[0].name)
                }               
                this.contentReady = true
                this.loading.dismiss()
              })
          })
          .catch(error => { 
            this.triggerToast('geolocationError: '+error) 
          })
      })   
  }

  ionViewWillLeave() {
    this.contentReady = false
  }

  addName()  {
    let name = document.getElementById('nameInput')['value']
    if (name.length > 1)
      this.name.setValue(name) 
  }

  addTag()  {
    this.tag.setValue(document.getElementById('tagInput')['value']) 
  }

  addComment() {
    this.comment.setValue(document.getElementById('commentInput')['value']) 
  }

  addPicture() {
    this.camera.getPicture()
      .then(imageData => { 
        let pic = 'data:image/jpeg;base64,' + imageData
        this.pic.setValue(pic) 
      })
      .catch(error => { 
        this.triggerToast('cameraError: '+error) 
      })
  }

  resetForm() {
    this.name.setValue(null)
    this.ratting.setValue(null)
    this.location.setValue(null)
    this.pic.setValue(null)
    this.tag.setValue(null)
    this.comment.setValue(null)
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
                      this.resetForm()
                      this.router.navigate(['home/myExperiences']) 
                    })
                })
            } 
            else {
              this.api.postExperience(experience)
                .subscribe(() => {
                  this.resetForm()
                  this.router.navigate(['home/myExperiences']) 
                })
            }
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
      spinner: "crescent",
      message: 'taix por ondi?',
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
      sheetObject.header = 'Rolês próximos'

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
      sheetObject.header = 'Tags mais votadas'

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
      text: 'Cancel',
      icon: 'close',
      role: 'cancel'
    })

    const actionSheet = await this.sheet.create(sheetObject);
    await actionSheet.present()
  }
}
