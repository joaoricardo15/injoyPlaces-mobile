import { Component } from '@angular/core';
import { CameraService } from '../utils/camera.service.';
import { BackgroundGeolocationService } from '../utils/backgroundGeolocation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'addExperience-page',
  templateUrl: 'addExperience.page.html',
  styleUrls: ['addExperience.page.scss']
})
export class AddExperiencePage {

  photo: string
  location: any

  constructor(
    private router: Router,
    private camera: CameraService,
    private geoLocation: BackgroundGeolocationService) {}

  addPicture() {
    this.camera.takePicture()
      .then(
        imageData => { this.photo = 'data:image/jpeg;base64,' + imageData},
        error => { console.error(error) })
      .catch(
        error => { console.error(error) })
  }

  addLocation() {
    this.geoLocation.getCurrentLocation()
      .then(
        location => { this.location = location }, 
        error => { console.error(error) })
      .catch(
        error => { console.error(error) })
  }

  addExperience() {
    this.photo = null
    this.location = null
    this.router.navigate(['/tabs/tab1']);
  }
}
