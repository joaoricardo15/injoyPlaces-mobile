import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../common/services/api.service';
import { CameraService } from '../../common/services/camera.service';
import { ActionSheetController } from '@ionic/angular';
import { iRole, iExperience, iAddress, iLocation } from '../../common/interfaces/injoyApi.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import { DataService } from 'src/app/common/services/data.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LoadingService } from 'src/app/common/services/loading.service';
import { NavigationService } from 'src/app/common/services/navigation.service';

@Component({
  selector: 'addExperience-page',
  templateUrl: 'addExperience.page.html',
  styleUrls: ['addExperience.page.scss']
})
export class AddExperiencePage {

  rolesAround: iRole[]
  currentRole: iRole
  currentPic: string = 'assets/images/InJoyWoman.png'
  submitting: boolean = false
  submitted: boolean = false
  nameChip: string
  tagChip: string
  occasionChip: string
  localAddress: iAddress

  name: FormControl
  location: FormControl
  address: FormControl
  ratting: FormControl
  pic: FormControl
  tag: FormControl
  occasion: FormControl
  comment: FormControl
  form: FormGroup

  isLocationAvailable: boolean = false
  godMode: boolean = false

  constructor(
    private router: Router,
    private api: ApiService,
    private data: DataService,
    private alert: AlertService,
    private toast: ToastService,
    private camera: CameraService,
    private diagnostic: Diagnostic,
    private loading: LoadingService,
    private sheet: ActionSheetController,
    private localStorage: LocalStorageService) {  }

  ngOnInit() {

    if (this.localStorage.getUser().email === 'god@injoy.com')
      this.godMode = true

    this.name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.location = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.required);
    this.ratting = new FormControl('');
    this.pic = new FormControl('');
    this.tag = new FormControl('', Validators.minLength(2));
    this.occasion = new FormControl('', Validators.minLength(2));
    this.comment = new FormControl('', Validators.minLength(3));

    this.form = new FormGroup({
      name: this.name,
      location: this.location,
      address: this.address,
      ratting: this.ratting,
      pic: this.pic,
      tag: this.tag,
      occasion: this.occasion,
      comment: this.comment
    })

    this.data.rolesAroundObserver
      .subscribe(result => {
        this.location.setValue(result['location'])
        this.rolesAround = result['roles']
        this.setAddress(result['location'])
      })
  }

  setAddressManualy() {
    this.alert.createAddressForm()
      .then(address => {
        this.address.setValue(address)
        this.api.getLocationFromAddress(address)
          .then(location => {
            this.location.setValue(location)
          })
      })
  }

  setAddress(location: iLocation ) {
    this.api.getAddress(location)
      .then(address => { 
        this.localAddress = address 
        if (!this.address.value) 
          this.address.setValue(address) 
        })
  }

  ionViewWillEnter() {
    this.confirmLocationAvailable()
  }

  ionViewWillLeave() {
    this.resetForm()
  }

  confirmLocationAvailable() {
    return new Promise(resolve => {
      this.diagnostic.isLocationAvailable()
        .then(isLocationAvailable => {
          this.isLocationAvailable = isLocationAvailable
          if (!isLocationAvailable)
            this.alert.createInformation('Você precisa ativar a localização do dispositivo')
              .then( async () => {
                this.diagnostic.switchToLocationSettings()
            })
          else {
            resolve()
            this.data.getRolesAround()
          }
        }).catch(error => {
          navigator.geolocation.getCurrentPosition(
            () => { resolve(); this.data.getRolesAround() },
            () => { alert('é necessário habilitar a localização') 
          })
        })
    })
  }

  addExperience(form) {
    setTimeout(() => {
      this.submitting = true;
      if (form.valid)
        this.alert.createConfirmation('Publicar experiência?')
          .then( async result => {
            if (result) {
              this.submitted = true;
              var experience: iExperience = {
                user: this.localStorage.getUser().user,
                name: this.name.value,
                ratting: this.ratting.value,
                location: this.location.value,
                address: this.address.value,
                date: new Date(),
                pic: null,
                tag: this.tag.value,
                occasion: this.occasion.value,
                comment: this.comment.value
              }
              if (this.pic.value) {
                this.camera.getBase64ImageFromURL(this.pic.value)
                  .subscribe(imgObject => {
                    experience.pic = { data: imgObject, contentType: 'image/png' }
                    this.postExperience(experience)
                  })
              }
              else {
                this.postExperience(experience)
              }
            }
          })
      else
        this.confirmLocationAvailable().then(() => {})
    }, 100)
  }

  postExperience(experience: iExperience) {
    this.loading.create(null, 500).subscribe(() => {})
    this.router.navigate(['home/myExperiences'])

    this.api.postExperience(experience)
      .subscribe(() => {
        this.toast.create('Experiência salva com sucesso!!!', 'success')
        this.data.getMyExperiences()
        this.data.getMyList()
      })
  }

  async presentActionSheet(type: string) {
    let sheetObject = {
      header: null,
      buttons: []
    }

    if (type == 'roles') {
      sheetObject.header = 'rolês próximos de você'

      for (let i = 0; i < this.rolesAround.length; i++) {
        sheetObject.buttons.push({
          text: this.rolesAround[i].name + ' (' + this.rolesAround[i].ratting.rattings + ' avaliações)',
          role: 'destructive',
          icon: 'pin',
          handler: () => {
            this.currentRole = this.rolesAround[i]
            this.name.setValue(this.rolesAround[i].name)
            this.address.setValue(this.rolesAround[i].address)

            this.nameChip = this.rolesAround[i].name
            this.occasion.setValue(null)
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
    else if (type == 'occasions') {
      sheetObject.header = 'Ocasiões mais escolhidas'

      for (let i = 0; i < this.currentRole.occasions.length; i++) {
        sheetObject.buttons.push({
          text: this.currentRole.occasions[i],
          role: 'destructive',
          icon: 'walk',
          handler: () => {
            this.occasion.setValue(this.currentRole.occasions[i])
            this.occasionChip = this.currentRole.occasions[i]
          }
        })
      }

      sheetObject.buttons.push({
        text: 'cancelar',
        icon: 'close',
        role: 'cancel'
      })
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

  canDeactivate(): Promise<boolean> | boolean {
    if(this.submitted != true && (this.ratting.value || this.occasion.value|| this.tag.value || this.pic.value || this.comment.value))
      return this.alert.createConfirmation()
    else
      return true
  }

  addName()  {
     if (this.name.valid)
      this.nameChip = this.name.value
  }

  removeName() {
    this.name.setValue(null)
    this.address.setValue(this.localAddress)
    this.occasion.setValue(null)
    this.tag.setValue(null)
    this.currentRole = null
    this.nameChip = null
    this.occasionChip = null
    this.tagChip = null
  }

  addTag()  {
    if (this.tag.valid)
      this.tagChip = this.tag.value
  }

  removeTag() {
    this.tag.setValue(null)
    this.tagChip = null;
  }

  addOccasion()  {
    if (this.occasion.valid)
      this.occasionChip = this.occasion.value
  }

  removeOccasion() {
    this.occasion.setValue(null)
    this.occasionChip = null;
  }

  addPicture() {
    this.camera.getPicture()
      .then(imageData => {
        let pic = 'data:image/png;base64,' + imageData
        this.currentPic = pic
        this.pic.setValue(pic)
      })
  }

  resetForm() {
    this.location.setValue(null)
    this.ratting.setValue(null)
    this.occasion.setValue(null)
    this.tag.setValue(null)
    this.pic.setValue(null)
    this.comment.setValue(null)
    this.currentPic = 'assets/images/InJoyWoman.png'
    this.tagChip = null
    this.occasionChip = null
    this.submitted = false
    this.submitting = false
  }
}
