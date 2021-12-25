import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AdminBarComponent } from './admin-bar.component';
import { RouterModule } from '@angular/router';
import { SideMenuService } from 'src/app/service/side-menu.service';

@NgModule({
  declarations: [ AdminBarComponent ],
  exports: [ AdminBarComponent ],
  imports: [
    CommonModule,
    RouterModule,

    MatIconModule,
    MatTooltipModule
  ],
  providers: [ SideMenuService ]
})
export class AdminBarModule { }
