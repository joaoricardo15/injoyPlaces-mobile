import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignUpPage } from './pages/signUp/signUp.page';

const routes: Routes = [
  { path: 'signUp', component: SignUpPage },
  { path: 'home', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
