import { Component, Input } from '@angular/core';
import { iAchievement } from '../../interfaces/injoyApi.interface';

@Component({
  selector: 'achievement',
  template: `
    <div id="main">
      <backgroundImageWrap [img]="achievement.img | imageURI">
        <ion-icon id="icon" *ngIf="achievement.icon" name="{{achievement.icon}}" color="medium"></ion-icon>
        <div id="title" [class.largeTitle]="achievement.message">{{achievement.title}}<ion-icon id="ribbon" *ngIf="achievement.message" name="ribbon" color="warning"></ion-icon></div>
        <ion-badge id="value" *ngIf="achievement.value !== null">{{achievement.value}}</ion-badge>
        <div id="message" *ngIf="achievement.message">{{achievement.message}}</div>
      </backgroundImageWrap>
    </div>
  `,
  styleUrls: ['achievement.component.scss']
})
export class AchievementComponent {
  @Input() achievement: iAchievement 
}
