import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyExperiencesPage } from './myExperiences.page';
import { CommonModule } from './../../common/common.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    AngularCommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MyExperiencesPage }])
  ],
  declarations: [MyExperiencesPage]
})
export class MyExperiencesModule {}
