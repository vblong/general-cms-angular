import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComingSoonComponent } from './coming-soon.component';

const routes: Routes = [
  {
    path: '',
    component: ComingSoonComponent,
  }
];

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class ComingSoonRoutingModule { }
