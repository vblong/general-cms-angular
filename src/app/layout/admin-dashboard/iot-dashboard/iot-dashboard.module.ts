import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IoTDashboardComponent } from './iot-dashboard.component';
import { IotDashboardRoutingModule } from './iot-dashboard-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ IoTDashboardComponent ],
  exports: [ IoTDashboardComponent ],
  imports: [
    CommonModule,
    IotDashboardRoutingModule,

    MatIconModule
  ]
})
export class IoTDashboardModule { }
