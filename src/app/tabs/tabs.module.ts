import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '../common/common.module';
import { TabsPage } from './tabs.page';
import { MyListPage } from '../pages/myList/myList.page';
import { AddExperiencePage } from './../pages/addExperience/addExperience.page';
import { MyExperiencesPage } from './../pages/myExperiences/myExperiences.page';
import { DataService } from './../common/services/data.service';
import { RoleService } from './../common/components/role/roles.service';
import { ExperienceService } from './../common/components/experience/experience.service';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    AngularCommonModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatRippleModule,
    MatExpansionModule,
  ],
  declarations: [
    TabsPage,
    MyListPage,
    AddExperiencePage,
    MyExperiencesPage
  ],
  providers: [
    DataService,
    RoleService,
    ExperienceService,
  ]
})
export class TabsPageModule {}
