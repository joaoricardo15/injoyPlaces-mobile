import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { RoleComponent } from './components/role/role.component';
import { RolesHorizontalListComponent } from './components/rolesHorizontalList/rolesHorizontalList.component';
import { RoleRatingComponent } from './components/roleRating/roleRating.component';
import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { RoleTagComponent } from './components/roleTag/roleTag.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { RolePageComponent } from '../pages/role/role.page';
import { ExperiencePage } from '../pages/experience/experience.page';
import { BackgroundImageWrapComponent } from './components/backgroundImageWrap/backgroundImageWrap.component';
import { ImageService } from './services/image.service';
import { ImageURIPipe } from './pipes/imageURI.pipe';

@NgModule({
  imports: [
    IonicModule,
    AngularCommonModule
  ],
  declarations: [
    ImageURIPipe,
    RoleComponent,
    RolePageComponent,
    ExperienceComponent,
    ExperiencePage,
    RoleTagComponent,
    RoleRatingComponent,
    RolesHorizontalListComponent,
    BackgroundImageWrapComponent,
  ],
  exports: [
    ImageURIPipe,
    RoleComponent,
    RolePageComponent,
    ExperienceComponent,
    ExperiencePage,
    RoleTagComponent,
    RoleRatingComponent,
    RolesHorizontalListComponent,
    BackgroundImageWrapComponent,
  ],
  entryComponents: [
    RoleRatingComponent
  ],
  providers: [
    Camera,
    Geolocation,
    ImageService,
    LocalNotifications,
    BackgroundGeolocation,
  ]
})
export class CommonModule {}
