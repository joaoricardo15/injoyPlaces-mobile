import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../common/services/api.service';
import { CameraService } from '../../common/services/camera.service';
import { ActionSheetController } from '@ionic/angular';
import { iRole, iExperience } from '../../common/interfaces/injoyApi.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import { DataService } from 'src/app/common/services/data.service';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/common/services/alert.service';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'addExperience-page',
  templateUrl: 'addExperience.page.html',
  styleUrls: ['addExperience.page.scss']
})
export class AddExperiencePage {

  currentRoles: iRole[]
  currentRole: iRole
  currentPic: string = 'assets/images/InJoyWoman.png'
  submitting: boolean = false
  submitted: boolean = false
  nameChip: string
  tagChip: string

  name: FormControl
  location: FormControl
  ratting: FormControl
  pic: FormControl
  tag: FormControl
  comment: FormControl
  form: FormGroup

  constructor(
    private router: Router,
    private api: ApiService,
    private data: DataService,
    private alert: AlertService,
    private toast: ToastService,
    private camera: CameraService,
    private sheet: ActionSheetController,
    private localStorage: LocalStorageService) {  }

  ngOnInit() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.location = new FormControl('', Validators.required);
    this.ratting = new FormControl('' , Validators.required);
    this.pic = new FormControl('');
    this.tag = new FormControl('', Validators.minLength(2));
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
    if(!this.location.value)
      this.location.setValue(this.data.location)

    this.api.getRolesAround()
      .subscribe(result => {
        this.location.setValue(result.location)
        this.currentRoles = result.roles
        if (result.roles.length > 0) {
          let choosedRole = result.roles.find(x => x.name == this.name.value)
          if (!choosedRole && this.router.url == '/home/addExperience')
            this.presentActionSheet('roles')
        }
      })
  }

  ionViewWillLeave() {
    this.resetForm()
  }

  canDeactivate(): Observable<boolean> | boolean {
    if(this.submitted != true && (this.ratting.value || this.pic.value || this.tag.value || this.comment.value))
      return this.alert.create()
    else 
      return true
  }

  addName()  {
     if (this.name.valid)
      this.nameChip = this.name.value
  }

  removeName() {
    this.name.setValue(null); 
    this.tag.setValue(null); 
    this.currentRole = null
    this.nameChip = null;
  }

  addTag()  {
    if (this.tag.valid)
      this.tagChip = this.tag.value
  }

  removeTag() {
    this.tag.setValue(null)
    this.tagChip = null;
  }

  addPicture() {
    this.camera.getPicture()
      .then(imageData => { 
        let pic = 'data:image/png;base64,' + imageData
        this.currentPic = pic
        this.pic.setValue(pic) 
      })
      .catch(error => { 
        this.toast.create('não foi possível acessar a sua câmera', 'danger')
      })
  }

  addExperience(form) {
    this.submitting = true; 
    if (form.valid)
      this.alert.create('Vamo dale?')
        .subscribe( async result => {
          if (result) {
            this.submitted = true; 
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
              let img = await this.camera.getBase64ImageFromURL(this.pic.value)

              this.camera.getBase64ImageFromURL(this.pic.value)
                .subscribe(imgObject => {
                  experience.pic = { data: imgObject, contentType: 'image/png' }
                  this.api.postExperience(experience)
                    .subscribe(() => {
                      this.toast.create('Experiência salva com sucesso!!!', 'success')
                      setTimeout(() => { this.data.updateAllData() }, 1000);
                      this.router.navigate(['home/myExperiences']) 
                    })
                })
            }
            else {
              this.api.postExperience(experience)
                .subscribe(() => {
                  this.toast.create('Experiência salva com sucesso!!!', 'success')
                  setTimeout(() => { this.data.updateAllData() }, 1000);
                  this.router.navigate(['home/myExperiences']) 
                })
            }
          }
        })
  }

  resetForm() {
    this.ratting.setValue(null)
    this.pic.setValue(null)
    this.tag.setValue(null)
    this.comment.setValue(null)
    this.currentPic = 'assets/images/InJoyWoman.png'
    this.tagChip = null
    this.submitted = false
    this.submitting = false
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
          text: this.currentRoles[i].name + ' (' + this.currentRoles[i].ratting.rattings + ' avaliações)',
          role: 'destructive',
          icon: 'pin',
          handler: () => {
            this.currentRole = this.currentRoles[i]
            this.name.setValue(this.currentRoles[i].name)
            this.nameChip = this.currentRoles[i].name
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
            this.tagChip = this.currentRole.tags[i]
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
