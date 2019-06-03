import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../common/services/api.service';
import { iMyExperiences, iExperience } from './../../common/interfaces/injoyApi.interface';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ExperienceService } from 'src/app/common/components/experience/experience.service';

@Component({
  selector: 'myExperiences-page',
  templateUrl: 'myExperiences.page.html',
  styleUrls: ['myExperiences.page.scss']
})
export class MyExperiencesPage implements OnInit {

  myExperiences: iMyExperiences
  
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private loading: LoadingController,
    private experienceService: ExperienceService) { }

  ngOnInit() {
    if (!this.myExperiences)
      this.triggerLoading()
        .then(() => {
          this.api.getMyExperiences()
            .subscribe((experiences: iMyExperiences) => {
              this.myExperiences = experiences
              this.loading.dismiss()
            })
        })

    this.route.params.subscribe(params => {
      if (params.udpdate)
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
