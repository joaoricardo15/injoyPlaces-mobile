import { Component, Input } from '@angular/core';

@Component({
  selector: 'role-tag',
  template: `
    <div id="main">
      #<ng-content></ng-content>
    </div>
  `,
  styleUrls: ['roleTag.component.scss']
})
export class RoleTagComponent { }
