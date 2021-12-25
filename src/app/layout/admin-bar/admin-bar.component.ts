import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SideMenuService } from 'src/app/service/side-menu.service';

import { TokenStorageService } from '../../service/token-storage.service';

@Component({
  selector: 'app-admin-bar',
  templateUrl: './admin-bar.component.html',
  styleUrls: ['./admin-bar.component.scss']
})
export class AdminBarComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showCollapseMenuBtn = false;
  username: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private _router: Router,
    private _sideMenuService: SideMenuService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  showCollapse(): boolean {
    return this._router.url.indexOf('dashboard') > 0;
  }

  toggleColapseSideMenu() {
    this._sideMenuService.toggle();
  }
}
