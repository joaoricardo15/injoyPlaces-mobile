import { Component, Input } from '@angular/core';

@Component({
  selector: 'role-display',
  template: `
    <div id="main">
      <div id="background"><div></div></div>
      <div id="content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['roleDisplay.component.scss']
})
export class RoleDisplayComponent { }
