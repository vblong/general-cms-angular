import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressSpinnerDialogComponent } from './progress-spinner-dialog.component'

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProgressSpinnerDialogComponent],
  exports: [ProgressSpinnerDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class ProgressSpinnerDialogModule { }
