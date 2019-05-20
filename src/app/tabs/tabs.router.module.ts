import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

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
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
