import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
import { DataService } from './../common/services/data.service';
import { RoleService } from './../common/components/role/roles.service';
import { ExperienceService } from './../common/components/experience/experience.service';
import { AddExperiencePage } from './../pages/addExperience/addExperience.page';
import { MyExperiencesPage } from './../pages/myExperiences/myExperiences.page';
import { CommonModule } from '../common/common.module';
import { MyListPage } from '../pages/myList/myList.page';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    AngularCommonModule,
    ReactiveFormsModule,
    TabsPageRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatRippleModule,
    MatExpansionModule,
    MatIconModule
  ],
  providers: [
    DataService,
    RoleService,
    ExperienceService,
  ],
  declarations: [
    TabsPage,
    MyListPage,
    AddExperiencePage,
    MyExperiencesPage
  ]
})
export class TabsPageModule {}
