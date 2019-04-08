import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { OpenStreepMapService } from '../utils/openStreetMap.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage
  ],
  providers: [
    OpenStreepMapService
  ]
})
export class TabsPageModule {}
