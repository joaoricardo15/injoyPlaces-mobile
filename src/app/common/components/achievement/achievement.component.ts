import { Component, Input } from '@angular/core';
import { iAchievement } from '../../interfaces/injoyApi.interface';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'achievement',
  template: `
    <div id="main" [class.achieved]="!achievement.subtitle && !achievement.value" matRipple [matRippleCentered]="true" (click)="createInformation()">
      <backgroundImageWrap [img]="achievement.img | imageURI" borderRadius="true">
        <ion-icon id="icon" *ngIf="achievement.icon" name="{{achievement.icon}}" color="medium"></ion-icon>
        <div id="title" [class.largeTitle]="achievement.subtitle">{{achievement.title}}<ion-icon id="ribbon" *ngIf="achievement.subtitle" name="ribbon" color="warning"></ion-icon></div>
        <div id="subtitle" *ngIf="achievement.subtitle">{{achievement.subtitle}}</div>
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

  constructor(private alert: AlertService) {}

  createInformation() {
    this.alert.createInformation(this.achievement.message.split('.')[0], this.achievement.message.split('.')[1])
  }
}
