import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './not-found.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ NotFoundComponent ],
  exports: [ NotFoundComponent ],
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule
  ]
})
export class NotFoundModule { }
