import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';

import { FlexTableModule } from 'src/app/shared/flex-table/flex-table.module';
import { EntriesComponent } from './entries.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ EntriesComponent ],
  exports: [ EntriesComponent ],
  imports: [
    CommonModule,
    EntriesRoutingModule,

    FlexTableModule,

    MatButtonModule
  ]
})
export class EntriesModule { }
