import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '../common/common.module';
import { TabsPage } from './tabs.page';
import { MyListPage } from '../pages/myList/myList.page';
import { AddExperiencePage } from './../pages/addExperience/addExperience.page';
import { MyExperiencesPage } from './../pages/myExperiences/myExperiences.page';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    AngularCommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TabsPage,
    MyListPage,
    AddExperiencePage,
    MyExperiencesPage
  ],
  providers: [
  ]
})
export class TabsPageModule {}
