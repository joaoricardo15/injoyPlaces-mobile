import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { RoleComponent } from './components/role/role.component';
import { RolesHorizontalListComponent } from './components/rolesHorizontalList/rolesHorizontalList.component';
import { RattingComponent } from './components/ratting/ratting.component';
import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { TagComponent } from './components/tag/tag.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { RolePage } from '../pages/role/role.page';
import { ExperiencePage } from '../pages/experience/experience.page';
import { BackgroundImageWrapComponent } from './components/backgroundImageWrap/backgroundImageWrap.component';
import { ImageURIPipe } from './pipes/imageURI.pipe';
import { GeolocationService } from './services/geolocation.service';
import { ApiService } from './services/api.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NavigationService } from './services/navigation.service';
import { LocalStorageService } from './services/localStorage.service';
import { BackgroundGeolocationService } from './services/backgroundGeolocation.service';
import { CameraService } from './services/camera.service';
import { CanDeactivateService } from './services/canDeactivate';
import { AlertService } from './services/alert.service';
import { DisplayComponent } from './components/display/display.component';
import { ToastService } from './services/toast.service';
import { LoadingService } from './services/loading.service';

@NgModule({
  imports: [
    IonicModule,
    AngularCommonModule
  ],
  declarations: [
    ImageURIPipe,
    RoleComponent,
    RolePage,
    ExperienceComponent,
    ExperiencePage,
    TagComponent,
    RattingComponent,
    DisplayComponent,
    RolesHorizontalListComponent,
    BackgroundImageWrapComponent,
  ],
  exports: [
    ImageURIPipe,
    RoleComponent,
    RolePage,
    ExperienceComponent,
    ExperiencePage,
    TagComponent,
    RattingComponent,
    DisplayComponent,
    RolesHorizontalListComponent,
    BackgroundImageWrapComponent,
  ],
  entryComponents: [],
  providers: [
    StatusBar,
    SplashScreen,
    AlertService,
    ToastService,
    LoadingService,
    ApiService,
    NavigationService,
    CanDeactivateService,
    Camera,
    CameraService,
    Geolocation,
    GeolocationService,
    LocalStorageService,
    BackgroundGeolocation,
    BackgroundGeolocationService,
    LocalNotifications,
  ]
})
export class CommonModule {}
