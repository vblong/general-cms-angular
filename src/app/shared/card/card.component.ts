import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() header: string = '';
  @Input() headline: string = '';
  @Input() footer: string = '';
  @Input() minHeight: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
