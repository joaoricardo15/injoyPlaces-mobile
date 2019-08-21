import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { MyListPage } from './pages/myList/myList.page';
import { AddExperiencePage } from './pages/addExperience/addExperience.page';
import { CanDeactivateService } from './common/services/canDeactivate';
import { MyExperiencesPage } from './pages/myExperiences/myExperiences.page';
import { RolePage } from './pages/role/role.page';
import { ExperiencePage } from './pages/experience/experience.page';
import { SignUpPage } from './pages/signUp/signUp.page';

export const AppRoutes: Routes = [
  {
    path: 'home',
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
    ],
  },
  {
    path: 'signUp',
    component: SignUpPage
  }
]