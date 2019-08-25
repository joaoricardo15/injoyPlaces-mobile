import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule as AngularCommonModule } from '@angular/common';

import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { PortalModule } from '@angular/cdk/portal';
import { PlatformModule } from '@angular/cdk/platform';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';

import { Camera } from '@ionic-native/camera/ngx';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

import { RolePage } from '../pages/role/role.page';
import { ExperiencePage } from '../pages/experience/experience.page';

import { RoleComponent } from './components/role/role.component';
import { RolesHorizontalListComponent } from './components/rolesHorizontalList/rolesHorizontalList.component';
import { RattingComponent } from './components/ratting/ratting.component';
import { TagComponent } from './components/tag/tag.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { BackgroundImageWrapComponent } from './components/backgroundImageWrap/backgroundImageWrap.component';
import { DisplayComponent } from './components/display/display.component';
import { AchievementComponent } from './components/achievement/achievement.component';

import { ApiService } from './services/api.service';
import { NavigationService } from './services/navigation.service';
import { LocalStorageService } from './services/localStorage.service';
import { BackgroundGeolocationService } from './services/backgroundGeolocation.service';
import { CameraService } from './services/camera.service';
import { CanDeactivateService } from './services/canDeactivate';
import { AlertService } from './services/alert.service';
import { ToastService } from './services/toast.service';
import { LoadingService } from './services/loading.service';

import { ImageURIPipe } from './pipes/imageURI.pipe';
import { ImageURISyncPipe } from './pipes/imageURI.pipe';
import { AddressPipe } from './pipes/address.pipe';
import { DataService } from './services/data.service';
import { RoleService } from './components/role/roles.service';
import { ExperienceService } from './components/experience/experience.service';

@NgModule({
  imports: [
    IonicModule,
    AngularCommonModule,
    MatChipsModule,
    MatIconModule,
    PortalModule,
    PlatformModule,
    MatRippleModule,
    MatListModule,
  ],
  declarations: [
    ImageURIPipe,
    ImageURISyncPipe,
    AddressPipe,
    RoleComponent,
    RolePage,
    ExperienceComponent,
    ExperiencePage,
    TagComponent,
    RattingComponent,
    DisplayComponent,
    RolesHorizontalListComponent,
    BackgroundImageWrapComponent,
    AchievementComponent,
  ],
  exports: [
    ImageURIPipe,
    ImageURISyncPipe,
    AddressPipe,
    RoleComponent,
    RolePage,
    ExperienceComponent,
    ExperiencePage,
    TagComponent,
    RattingComponent,
    DisplayComponent,
    RolesHorizontalListComponent,
    BackgroundImageWrapComponent,
    AchievementComponent,

    MatRippleModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatGridListModule
  ],
  entryComponents: [],
  providers: [
    SplashScreen,
    AlertService,
    ToastService,
    LoadingService,
    ApiService,
    NavigationService,
    CanDeactivateService,
    Camera,
    CameraService,
    LocalStorageService,
    BackgroundGeolocation,
    BackgroundGeolocationService,
    Diagnostic,
    DataService,
    RoleService,
    ExperienceService
  ]
})
export class CommonModule {}
