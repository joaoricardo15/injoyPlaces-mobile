import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { CommonModule } from '../common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddExperiencePage } from './addExperience.page';
import { CameraService } from '../common/services/camera.service.';
import { GeolocationService } from '../common/services/geolocation.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    AngularCommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AddExperiencePage }])
  ],
  declarations: [
    AddExperiencePage,
  ],
  providers: [
    CameraService,
    GeolocationService,
  ]
})
export class AddExperienceModule {}
