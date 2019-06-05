import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { CommonModule } from '../common/common.module';
import { RolePage } from '../pages/role/role.page';
import { ExperiencePage } from '../pages/experience/experience.page';
import { CanDeactivateService } from '../common/services/canDeactivate';
import { AddExperiencePage } from '../pages/addExperience/addExperience.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'myList',
        children: [
          {
            path: '',
            loadChildren: './../pages/myList/myList.module#MyListModule'
          }
        ]
      },
      {
        path: 'addExperience',
        children: [
          {
            path: '',
            component: AddExperiencePage,
            canDeactivate: [CanDeactivateService]
          }
        ]
      },
      {
        path: 'myExperiences',
        children: [
          {
            path: '',
            loadChildren: './../pages/myExperiences/myExperiences.module#MyExperiencesModule'
          }
        ]
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
  },
  {
    path: '',
    redirectTo: 'myList',
    pathMatch: 'full'
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
