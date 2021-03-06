import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'ecommerce' },
      { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
      { path: 'iot-dashboard', loadChildren: () => import('./iot-dashboard/iot-dashboard.module').then(m => m.IoTDashboardModule) },
      // { path: 'iot-dashboard', loadChildren: () => import('./iot-dashboard/iot-dashboard.module').then(m => m.IoTDashboardModule) },
      { path: 'entries', loadChildren: () => import('./entries/entries.module').then(m => m.EntriesModule) },
      { path: 'new-entry', loadChildren: () => import('./new-entry/new-entry.module').then(m => m.NewEntryModule) },
      { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
      { path: 'coming-soon', loadChildren: () => import('../coming-soon/coming-soon.module').then(m => m.ComingSoonModule) },
      { path: '**', redirectTo: 'coming-soon' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
