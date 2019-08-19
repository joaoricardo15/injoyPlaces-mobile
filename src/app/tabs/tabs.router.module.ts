import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { CommonModule } from '../common/common.module';
import { RolePage } from '../pages/role/role.page';
import { ExperiencePage } from '../pages/experience/experience.page';
import { CanDeactivateService } from '../common/services/canDeactivate';
import { MyListPage } from '../pages/myList/myList.page';
import { AddExperiencePage } from '../pages/addExperience/addExperience.page';
import { MyExperiencesPage } from '../pages/myExperiences/myExperiences.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'myList',
        component: MyListPage,
      },
      {
        path: 'addExperience',
        component: AddExperiencePage,
        canDeactivate: [CanDeactivateService]
      },
      {
        path: 'myExperiences',
        component: MyExperiencesPage,
      },
      {
        path: 'role',
        component: RolePage,
      },
      {
        path: 'experience',
        component: ExperiencePage,
      },
      {
        path: '',
        redirectTo: 'myList',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
