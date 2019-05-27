import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { CommonModule } from '../common/common.module';
import { RolePageComponent } from '../common/components/rolePage/rolePage.component';
import { ExperiencePageComponent } from '../common/components/experiencePage/experiencePage.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'myList',
        children: [
          {
            path: '',
            loadChildren: '../myList/myList.module#MyListModule'
          }
        ]
      },
      {
        path: 'addExperience',
        children: [
          {
            path: '',
            loadChildren: '../addExperience/addExperience.module#AddExperienceModule'
          }
        ]
      },
      {
        path: 'myExperiences',
        children: [
          {
            path: '',
            loadChildren: '../myExperiences/myExperiences.module#MyExperiencesModule'
          }
        ]
      },
      {
        path: 'role',
        component: RolePageComponent,
      },
      {
        path: 'experience',
        component: ExperiencePageComponent,
      },
      {
        path: '',
        redirectTo: '/tabs/myList',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/myList',
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
