import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export interface Item {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subItem?: Item[];
}

@Component({
  selector: 'app-flex-checkbox',
  templateUrl: './flex-checkbox.component.html',
  styleUrls: ['./flex-checkbox.component.scss']
})
export class FlexCheckboxComponent implements OnInit {

  @Input() name: string = "New Box";
  @Input() displayAttr: string = "";
  @Input() items: any[] = [];
  @Input() buttonTooltip: string = "Edit";
  @Input() buttonRouterLink: string = "#";
  @Output() states: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  task: Item = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subItem: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subItem != null && this.task.subItem.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subItem == null) {
      return false;
    }
    return this.task.subItem.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subItem == null) {
      return;
    }
    this.task.subItem.forEach(t => (t.completed = completed));
  }

  statesChanges(item: any, value: any) {
    this.states.emit({item, value});
  }

}
