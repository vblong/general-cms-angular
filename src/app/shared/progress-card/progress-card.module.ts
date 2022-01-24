import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressCardComponent } from './progress-card.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ ProgressCardComponent ],
  exports: [ ProgressCardComponent ],
  imports: [
    CommonModule,

    MatProgressBarModule
  ]
})
export class ProgressCardModule { }
