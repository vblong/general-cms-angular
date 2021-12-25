import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryComponent } from './entry.component';

import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
@NgModule({
  declarations: [ EntryComponent ],
  exports: [ EntryComponent ],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule
  ]
})
export class EntryModule { }
