import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceComponent } from './ecommerce.component';
import { EcommerceRoutingModule } from './ecommerce-routing.module';

import { NgxEchartsModule } from 'ngx-echarts';

import { CardModule } from '../../../shared/card/card.module';
import { ProgressCardModule } from '../../../shared/progress-card/progress-card.module';
import { FlexTableModule } from 'src/app/shared/flex-table/flex-table.module';

@NgModule({
  declarations: [ EcommerceComponent ],
  exports: [ EcommerceComponent ],
  imports: [
    CommonModule,
    EcommerceRoutingModule,

    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),

    CardModule,
    ProgressCardModule,
    FlexTableModule
  ]
})
export class EcommerceModule { }
