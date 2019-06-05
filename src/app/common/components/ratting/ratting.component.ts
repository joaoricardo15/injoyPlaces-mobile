import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ratting',
  template: `
    <div id="main">
      <ion-icon *ngFor="let starName of starsNames; let i = index" 
        size="{{size}}"
        color="warning"
        name="{{starName}}"
        (click)="onRate.emit(i+1)">
      </ion-icon>
    </div>
  `,
  styleUrls: ['ratting.component.scss']
})
export class RattingComponent implements OnChanges {
  @Input() rate: number = 0
  @Input() size: string = 'small'
  @Output() onRate = new EventEmitter()

  starsNames = ['star-outline', 'star-outline', 'star-outline', 'star-outline', 'star-outline']

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rate)
      for (let i = 0; i < this.starsNames.length; i++) 
        if (i+1 <= changes.rate.currentValue)
          this.starsNames[i] = 'star'
        else if (i+0.5 <= changes.rate.currentValue)
          this.starsNames[i] = 'star-half'
        else
          this.starsNames[i] = 'star-outline'
  }
}
