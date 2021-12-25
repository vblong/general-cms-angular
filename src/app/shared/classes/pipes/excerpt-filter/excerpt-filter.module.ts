import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcerptFilter } from './excerpt-filter';

@NgModule({
  declarations: [ ExcerptFilter ],
  exports: [ ExcerptFilter ],
  imports: [
    CommonModule
  ]
})
export class ExcerptFilterModule {
  static forRoot() {
    return {
      ngModule: ExcerptFilterModule,
      providers: []
    }
  }
 }
