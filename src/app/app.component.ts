import { Component, OnInit } from '@angular/core';
import { NavigationService } from './common/services/navigation.service';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `
})
export class AppComponent implements OnInit {

  constructor(private navigation: NavigationService) { }

  ngOnInit() {
    this.navigation.initControllers() 
  }
}
