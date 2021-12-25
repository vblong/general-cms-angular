import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { EntryComponent } from './layout/entry/entry.component';
import { PostComponent } from './layout/post/post.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { ComingSoonComponent } from './layout/coming-soon/coming-soon.component';

const routes: Routes = [
  { path: '', component: ContentLayoutComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./layout/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./layout/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'post',
    component: PostComponent
  },
  {
    path: 'entry',
    component: EntryComponent
  },
  {
    path: 'coming-soon',
    component: ComingSoonComponent
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
