import { Component, Input } from '@angular/core';

@Component({
  selector: 'backgroundImageWrap',
  template: `
    <div id="main" [class.borderRadius]="borderRadius">
      <div id="imageBackground">
        <img *ngIf="img" src="{{img}}">
      </div>
      <div id="content">
        <ng-content ></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['backgroundImageWrap.component.scss']
})
export class BackgroundImageWrapComponent {
  @Input() img: string
  @Input() borderRadius: boolean = false
}
