import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MENU_ITEMS } from './side-menu.menu';

import { SideMenuService } from '../../../service/side-menu.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  showFiller = false;
  collapse = true;
  menus: any = MENU_ITEMS;
  constructor(
    private _sideMenuService: SideMenuService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._sideMenuService.change.subscribe(collapse => {
      this.collapse = collapse;
    });

    this.menus.forEach(element => {
      element.active = false;
      if(this._router.url.indexOf(element.link) > 0) {
        element.active = true;
      }
    });

    this._router.events.subscribe((ev) => {
      if(ev instanceof NavigationEnd) {
        this.menus.forEach(element => {
          element.active = false;
          if(ev.url.indexOf(element.link) > 0) {
            element.active = true;
          }
        });
      }
    });
  }

}
