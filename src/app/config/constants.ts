import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Constants {
  public readonly FRONTEND_ADDR: string = "http://localhost";
  public readonly FRONTEND_PORT: string = ":8000";
  public readonly FRONTEND_ENDPOINT: string = this.FRONTEND_ADDR + this.FRONTEND_PORT;
  public readonly API_PORT: string = ":8000";
  public readonly API_ENDPOINT: string = this.FRONTEND_ADDR + this.API_PORT; //'http://localhost:8000';
  public readonly API_MOCK_ENDPOINT: string = this.FRONTEND_ADDR + this.API_PORT; //'http://localhost:8000';

  //  Site information
  private _SITE_TITLE: string = "Long Vu";
  public get SITE_TITLE(): string {
    return this._SITE_TITLE;
  }
  public set SITE_TITLE(value: string) {
    this._SITE_TITLE = value;
  }
  private _SITE_HEADLINE: string = "Just another Angular app";
  public get SITE_HEADLINE(): string {
    return this._SITE_HEADLINE;
  }
  public set SITE_HEADLINE(value: string) {
    this._SITE_HEADLINE = value;
  }
}

