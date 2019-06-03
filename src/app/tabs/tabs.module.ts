import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
import { DataService } from '../common/services/data.service';
import { RoleService } from '../common/components/role/roles.service';
import { ExperienceService } from '../common/components/experience/experience.service';
import { AddExperiencePage } from '../pages/addExperience/addExperience.page';
import { CommonModule } from '../common/common.module';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    AngularCommonModule,
    ReactiveFormsModule,
    TabsPageRoutingModule
  ],
  providers: [
    DataService,
    RoleService,
    ExperienceService,
  ],
  declarations: [
    TabsPage,
    AddExperiencePage
  ]
})
export class TabsPageModule {}
