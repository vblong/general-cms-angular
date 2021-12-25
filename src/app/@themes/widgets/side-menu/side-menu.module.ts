import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideMenuComponent } from './side-menu.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ SideMenuComponent ],
  exports: [ SideMenuComponent ],
  imports: [
    CommonModule,
    RouterModule,

    MatSidenavModule,
    MatIconModule
  ]
})
export class SideMenuModule { }
