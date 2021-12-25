import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryListComponent } from './entry-list.component';

import { ExcerptFilterModule } from '../../../shared/classes/pipes/excerpt-filter/excerpt-filter.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
@NgModule({
  declarations: [ EntryListComponent ],
  exports: [ EntryListComponent ],
  imports: [
    CommonModule,
    RouterModule,

    ExcerptFilterModule.forRoot(),

    /**  Material modules */
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatGridListModule
  ]
})
export class EntryListModule { }
