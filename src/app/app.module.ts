import 'hammerjs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SignUpPage } from './pages/signUp/signUp.page';
import { AppRoutingModule } from './app-routing.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from './common/common.module';

@NgModule({
  declarations: [
    AppComponent,
    SignUpPage
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  entryComponents: [ ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
