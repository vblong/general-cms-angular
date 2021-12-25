import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComingSoonComponent } from './coming-soon.component';
import { ComingSoonRoutingModule } from './coming-soon-routing.module';

@NgModule({
  declarations: [ ComingSoonComponent ],
  exports: [ ComingSoonComponent ],
  imports: [
    CommonModule,
    ComingSoonRoutingModule,
  ]
})
export class ComingSoonModule { }
