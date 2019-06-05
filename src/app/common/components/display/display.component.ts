import { Component } from '@angular/core';

@Component({
  selector: 'display',
  template: `
    <div id="main">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['display.component.scss']
})
export class DisplayComponent {}
