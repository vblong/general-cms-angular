import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { StringHelper } from 'src/app/helpers/string-helper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  siteTitle: string;
  headline: string;

  constructor(private _constants: Constants) { }

  ngOnInit(): void {
    this.siteTitle = this._constants.SITE_TITLE;
    this.headline = this._constants.SITE_HEADLINE
  }

}
