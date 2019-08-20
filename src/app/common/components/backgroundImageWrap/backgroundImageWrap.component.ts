import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'backgroundImageWrap',
  template: `
    <div id="main" [class.borderRadius]="borderRadius">
      <div id="imageBackground">
        <img *ngIf="localImg" src="{{localImg}}">
      </div>
      <div id="content">
        <ng-content ></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['backgroundImageWrap.component.scss']
})
export class BackgroundImageWrapComponent implements OnChanges {
  @Input() img: Promise<string>
  @Input() borderRadius: boolean = false

  localImg: string

  ngOnChanges(changes: SimpleChanges) {
    if (changes.img.currentValue) {
      if (typeof changes.img.currentValue === 'string')
        this.localImg = changes.img.currentValue
      else
        changes.img.currentValue.then(img => { this.localImg = img })
    }
      
  }
}
