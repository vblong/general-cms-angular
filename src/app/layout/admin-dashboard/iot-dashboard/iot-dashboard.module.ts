import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IoTDashboardComponent } from './iot-dashboard.component';
import { IotDashboardRoutingModule } from './iot-dashboard-routing.module';
import { SwitchButtonModule } from 'src/app/shared/switch-button/switch-button.module';

@NgModule({
  declarations: [ IoTDashboardComponent ],
  exports: [ IoTDashboardComponent ],
  imports: [
    CommonModule,
    IotDashboardRoutingModule,

    SwitchButtonModule
  ]
})
export class IoTDashboardModule { }
