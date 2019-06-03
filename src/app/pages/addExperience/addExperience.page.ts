import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../common/services/api.service';
import { CameraService } from '../../common/services/camera.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { iRole, iExperience } from '../../common/interfaces/injoyApi.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import { ExperienceService } from 'src/app/common/components/experience/experience.service';
import { DataService } from 'src/app/common/services/data.service';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/common/services/alert.service';

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
    private data: DataService,
    private alert: AlertService,
    private camera: CameraService,
    private toast: ToastController,
    private loading: LoadingController,
    private sheet: ActionSheetController,
    private localStorage: LocalStorageService,
    private experienceService: ExperienceService) {  }

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.location = new FormControl('', Validators.required);
    this.ratting = new FormControl('' , Validators.required);
    this.pic = new FormControl('');
    this.tag = new FormControl('');
    this.comment = new FormControl('', Validators.minLength(3));

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
    // if (!this.location.value ) {
    //   this.location.setValue(this.data.myLocation)
    //   this.currentRoles = this.data.rolesAround
    //   if (this.data.rolesAround.length > 0) {
    //     this.presentActionSheet('roles')
    //   }

       this.contentReady = true
    // }
    // else {
      this.api.getRolesAround()
        .subscribe(result => {
          this.location.setValue(result.location)
          this.currentRoles = result.roles
          if (result.roles.length > 0) {

            let choosedRole = result.roles.find(x => x.name == this.name.value)
            if (!choosedRole)
              this.presentActionSheet('roles')
          }
        })
    //}
  }

  ionViewWillLeave() {
    this.resetForm()
  }

  canDeactivate(): Observable<boolean> | boolean {
    if(!this.submitted && this.ratting.value || this.pic.value || this.tag.value || this.comment.value)
      return this.alert.create()
    else 
      return true
  }

  addName()  {
    let name = document.getElementById('nameInput')['value']
    if (name.length > 2)
      this.name.setValue(name) 
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
    this. submitted = true; 
    if (form.valid)
      this.alert.create('Vamo dale?')
        .subscribe( async result => {
          if (result) {
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
              experience.pic = { 
                data: await this.camera.getBase64ImageFromURL(this.pic.value),
                contentType: 'image/png' 
              }
            } 
            this.api.postExperience(experience)
              .subscribe(() => {
                this.triggerToast('Experiência salva com sucesso!!!', 'success')
                this.experienceService.setExperience(experience)
                
                this.router.navigate(['home/myExperiences', { update: true }]) 
              })
          }
        })
  }

  resetForm() {
    this.ratting.setValue(null)
    this.pic.setValue(null)
    this.tag.setValue(null)
    this.comment.setValue(null)
    this.currentPic = 'assets/images/InJoyWoman.png'
    this.submitted = false
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
      sheetObject.header = 'Em qual Rolê você está?'

      for (let i = 0; i < this.currentRoles.length; i++) {
        sheetObject.buttons.push({
          text: this.currentRoles[i].name,
          role: 'destructive',
          icon: 'pin',
          handler: () => {
            this.currentRole = this.currentRoles[i]
            this.name.setValue(this.currentRoles[i].name)
            this.tag.setValue(null)
          }
        })
      }
      sheetObject.buttons.push({
        text: 'Nenhum dos rolês listados...',
        icon: 'close',
        role: 'cancel'
      })
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
      sheetObject.buttons.push({
        text: 'cancelar',
        icon: 'close',
        role: 'cancel'
      })
    }
    const actionSheet = await this.sheet.create(sheetObject);
    await actionSheet.present()
  }
}
