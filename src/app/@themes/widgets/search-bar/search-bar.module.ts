import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchBarComponent } from './search-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ SearchBarComponent ],
  exports: [ SearchBarComponent ],
  imports: [
    CommonModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class SearchBarModule { }
