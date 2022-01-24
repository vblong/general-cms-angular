import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss']
})
export class ProgressCardComponent implements OnInit {

  @Input() header: string = '';
  @Input() headline: string = '';
  @Input() footer: string = '';
  @Input() progress: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
