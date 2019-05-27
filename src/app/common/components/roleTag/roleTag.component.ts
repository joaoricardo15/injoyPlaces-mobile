import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'role-tag',
  template: `
    <ion-chip id="main" [ngClass]="size" color="{{color}}">
      <ion-icon name="{{icon}}"></ion-icon>
      <ion-label color="light"><ng-content></ng-content></ion-label>
      <ion-icon *ngIf="close" name="close-circle" (click)="onClose.emit()"></ion-icon>
    </ion-chip>
  `,
  styleUrls: ['roleTag.component.scss']
})
export class RoleTagComponent {
  @Input() size: string = 'default'
  @Input() color: string = 'warning'
  @Input() icon: string = 'pricetag'
  @Input() close: boolean = false
  @Output() onClose = new EventEmitter
}
