import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    TabsPageRoutingModule
  ],
  providers: [
  ],
  declarations: [
    TabsPage
  ]
})
export class TabsPageModule {}
