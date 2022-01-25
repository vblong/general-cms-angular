import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IoTDashboardComponent } from './iot-dashboard.component';

const routes: Routes = [
  { path: '', component: IoTDashboardComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IotDashboardRoutingModule { }
