import { Component, Input } from '@angular/core';
import { iAchievement } from '../../interfaces/injoyApi.interface';

@Component({
  selector: 'achievement',
  template: `
    <div id="main" matRipple [matRippleCentered]="true">
      <backgroundImageWrap [img]="achievement.img | imageURI">
        <ion-icon id="icon" *ngIf="achievement.icon" name="{{achievement.icon}}" color="medium"></ion-icon>
        <div id="title" [class.largeTitle]="achievement.message">{{achievement.title}}<ion-icon id="ribbon" *ngIf="achievement.message" name="ribbon" color="warning"></ion-icon></div>
        <div id="message" *ngIf="achievement.message">{{achievement.message | slice:0:50 }}<span *ngIf="achievement.message.length > 50">...</span></div>
        <div id="value" *ngIf="achievement.value">
          <ion-icon class="star" name="star" color="medium"></ion-icon>
          <ion-icon class="star" name="{{achievement.value > 1 ? 'star' : 'star-outline'}}" color="danger"></ion-icon>
          <ion-icon class="star" name="{{achievement.value > 2 ? 'star' : 'star-outline'}}" color="warning"></ion-icon>
        </div>
      </backgroundImageWrap>
    </div>
  `,
  styleUrls: ['achievement.component.scss']
})
export class AchievementComponent {
  @Input() achievement: iAchievement 

  
}
