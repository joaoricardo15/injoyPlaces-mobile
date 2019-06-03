import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { SignUpPage } from './pages/signUp/signUp.page';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppRoutingModule } from './app-routing.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BackgroundGeolocationService } from './common/services/backgroundGeolocation.service';
import { ApiService } from './common/services/api.service';
import { RoleService } from './common/components/role/roles.service';
import { ExperienceService } from './common/components/experience/experience.service';
import { LocalStorageService } from './common/services/localStorage.service';
import { NavigationService } from './common/services/navigation.service';

@NgModule({
  declarations: [
    AppComponent,
    SignUpPage
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  entryComponents: [

  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    RoleService,
    ExperienceService,
    NavigationService,
    LocalStorageService,
    BackgroundGeolocationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
