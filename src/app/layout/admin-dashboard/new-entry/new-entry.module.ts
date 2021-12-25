import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEntryComponent } from './new-entry.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NewEntryRoutingModule } from './new-entry-routing-module';

import { FlexCheckboxModule } from 'src/app/shared/flex-checkbox/flex-checkbox.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ NewEntryComponent ],
  exports: [ NewEntryComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NewEntryRoutingModule,

    EditorModule,
    FlexCheckboxModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule
  ]
})
export class NewEntryModule { }
