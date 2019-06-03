import { Component, OnInit } from '@angular/core';
import { NavigationService } from './common/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private navigation: NavigationService) { }

  ngOnInit() {
    this.navigation.initControllers() 
  }
}
