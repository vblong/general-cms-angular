import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/config/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  siteTitle;

  constructor(private _constants: Constants) { }

  ngOnInit(): void {
    this.siteTitle = this._constants.SITE_TITLE;
  }

}
