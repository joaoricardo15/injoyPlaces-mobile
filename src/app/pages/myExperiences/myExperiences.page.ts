import { Component } from '@angular/core';
import { ApiService } from './../../common/services/api.service';
import { iMyExperiences, iExperience } from './../../common/interfaces/injoyApi.interface';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'myExperiences-page',
  templateUrl: 'myExperiences.page.html',
  styleUrls: ['myExperiences.page.scss']
})
export class MyExperiencesPage {

  myExperiences: iMyExperiences
  
  constructor(private api: ApiService, private loading: LoadingController) { }

  ionViewWillEnter () {
    if (this.myExperiences) {
      // this.api.getMyExperiences()
      //   .subscribe((experiences: iMyExperiences) => {
      //     this.myExperiences = experiences
      //   })
    }
    else {
      this.triggerLoading()
        .then(() => {
          this.api.getMyExperiences()
            .subscribe((experiences: iMyExperiences) => {
              this.myExperiences = experiences
              this.loading.dismiss()
            })
        })
    }
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
