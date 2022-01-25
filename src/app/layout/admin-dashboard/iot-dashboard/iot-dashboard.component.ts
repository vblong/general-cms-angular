import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-io-tdashboard',
  templateUrl: './iot-dashboard.component.html',
  styleUrls: ['./iot-dashboard.component.scss']
})
export class IoTDashboardComponent implements OnInit {

  lightState: boolean = true;
  rollerShadesState: boolean = true;
  wirelessAudioState: boolean = true;
  coffeeMakerState: boolean = true;

  @Input() state: boolean = true;
  @Input() name: string = 'Light';
  @Input() icon: string = '';
  @Input() color: string = '';
  @Input() backgroundColor: string = '#6707EE';

  constructor() { }

  ngOnInit(): void {
  }

}
