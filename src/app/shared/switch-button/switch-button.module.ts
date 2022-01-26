import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwitchButtonComponent } from './switch-button.component';

import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [ SwitchButtonComponent ],
  exports: [ SwitchButtonComponent ],
  imports: [
    CommonModule,

    MatIconModule,
    MatRippleModule
  ]
})
export class SwitchButtonModule { }
