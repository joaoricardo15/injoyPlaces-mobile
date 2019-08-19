import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tag',
  template: `
    <ion-chip id="main" [ngClass]="size" [color]="color" [mode]="'ios'">
      <ion-icon name="{{icon}}"></ion-icon>
      <ion-label color="{{fontColor}}"><ng-content></ng-content></ion-label>
      <ion-icon *ngIf="close" name="close-circle" (click)="onClose.emit()"></ion-icon>
    </ion-chip>
  `,
  styleUrls: ['tag.component.scss']
})
export class TagComponent {
  @Input() size: string = 'default'
  @Input() color: string = 'warning'
  @Input() fontColor: string = 'light'
  @Input() icon: string = 'pricetag'
  @Input() close: boolean = false
  @Output() onClose = new EventEmitter
}
