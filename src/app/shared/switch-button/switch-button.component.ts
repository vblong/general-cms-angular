import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss']
})
export class SwitchButtonComponent implements OnInit {

  @Input() state: boolean = true;
  @Input() name: string = '';
  @Input() icon: string = '';
  @Input() iconColor: string = '';
  @Input() textColor: string = '';
  @Input() backgroundColor: string = 'var(--primary)';
  @Input() iconBackgroundColor: string = '#6707EE';
  iconBackgroundGradientColor: string = '';

  @Output() switch: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.iconBackgroundGradientColor = 'linear-gradient(20deg, #ffffff 0%, ' + this.iconBackgroundColor + ' 50%, ' + this.iconBackgroundColor + ' 100%)';
  }

  click(): void {
    this.state = !this.state;
    this.switch.emit(this.state);
  }
}
