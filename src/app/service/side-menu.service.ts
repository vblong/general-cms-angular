import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class SideMenuService {

  isOpen = true;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }

}
