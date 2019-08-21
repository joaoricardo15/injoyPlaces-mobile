import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SignUpPage } from './pages/signUp/signUp.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from './common/common.module';
import { TabsPageModule } from './tabs/tabs.module';
import { AppRoutes } from './app.routes';

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
    TabsPageModule,
    IonicModule.forRoot({ scrollAssist: false }),
    RouterModule.forRoot(AppRoutes),
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
