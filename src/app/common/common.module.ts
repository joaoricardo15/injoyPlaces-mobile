import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { RoleComponent } from './components/role/role.component';
import { RoleDisplayComponent } from './components/roleDisplay/roleDisplay.component';
import { RolesHorizontalListComponent } from './components/rolesHorizontalList/rolesHorizontalList.component';
import { RoleRattingComponent } from './components/roleRatting/roleRatting.component';
import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@NgModule({
  imports: [
    IonicModule,
    AngularCommonModule
  ],
  declarations: [
    RoleComponent,
    RoleDisplayComponent,
    RoleRattingComponent,
    RolesHorizontalListComponent
  ],
  exports: [
    RoleComponent,
    RoleDisplayComponent,
    RoleRattingComponent,
    RolesHorizontalListComponent
  ],
  providers: [
    Camera,
    Geolocation,
    LocalNotifications
  ]
})
export class CommonModule {}
