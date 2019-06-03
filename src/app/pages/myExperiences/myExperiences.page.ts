import { Component, OnInit } from '@angular/core';
import { iMyExperiences, iExperience } from './../../common/interfaces/injoyApi.interface';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ExperienceService } from 'src/app/common/components/experience/experience.service';
import { DataService } from 'src/app/common/services/data.service';

@Component({
  selector: 'myExperiences-page',
  templateUrl: 'myExperiences.page.html',
  styleUrls: ['myExperiences.page.scss']
})
export class MyExperiencesPage implements OnInit {

  myExperiences: iMyExperiences
  
  constructor(
    private api: DataService,
    private route: ActivatedRoute,
    private loading: LoadingController,
    private experienceService: ExperienceService) { }

  ngOnInit() {
    if (this.api.myExperiences)
      this.myExperiences = this.api.myExperiences

    this.route.params.subscribe(params => {
      if (params.update)
        this.myExperiences.experiences.push(this.experienceService.getExperience())
    });
  }

  async triggerLoading() {
    let loadingInstance = await this.loading.create({
      spinner: "crescent",
      message: 'Carregando experiências',
      translucent: true
    })
    return await loadingInstance.present();
  }
}
