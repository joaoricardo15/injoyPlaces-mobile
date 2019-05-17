import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddExperiencePage } from './addExperience.page';
import { CameraService } from '../utils/camera.service.';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AddExperiencePage }])
  ],
  declarations: [
    AddExperiencePage
  ],
  providers: [
    CameraService
  ]
})
export class AddExperienceModule {}
