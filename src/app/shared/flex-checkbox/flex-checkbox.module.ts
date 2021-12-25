import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { FlexCheckboxComponent } from './flex-checkbox.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ FlexCheckboxComponent ],
  exports: [ FlexCheckboxComponent ],
  imports: [
    CommonModule,
    RouterModule,

    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class FlexCheckboxModule { }
