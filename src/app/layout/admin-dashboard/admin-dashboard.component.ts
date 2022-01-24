import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AsyncSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entry } from 'src/app/@core/types/entry';
import { ApiEndpointsService } from 'src/app/service/api-endpoints.service';
import { ApiHttpService } from 'src/app/service/api-http-service';
import { MENU_ITEMS } from '../../@themes/widgets/side-menu/side-menu.menu';

import { StringHelper } from '../../helpers/string-helper';
import { Constants } from '../../config/constants';
import { SideMenuService } from 'src/app/service/side-menu.service';

const maxLength = (
  editorSubject: Subject<any>,
  characterLimit: number
): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return editorSubject.pipe(
      map((editor) => {
        const characterCount = editor.plugins.wordcount.body.getCharacterCount();

        return characterCount <= characterLimit
          ? null
          : {
              maxlength: {
                requiredLength: characterLimit,
                actualLength: characterCount,
              },
            };
      })
    );
  };
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  private editorSubject: Subject<any> = new AsyncSubject();
  private strHelper: StringHelper;
  menu = MENU_ITEMS;
  collapse: boolean = true;

  constructor(private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
    private _sideMenuService: SideMenuService,
    private constants: Constants) {
      this.strHelper = new StringHelper();
    }

  ngOnInit(): void {
    this._sideMenuService.change.subscribe(collapse => {
      this.collapse = collapse;
    });

    this.collapse = this._sideMenuService.getState();
  }

  public myForm = new FormGroup({
    title: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required)
  });

  handleEditorInit(e) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  //  DEPRECATED
  onSubmit() {
    console.log("New entry submitted");
    let newEntry: Entry = {
      post_author: 0,
      post_content: this.myForm.value.body,
      post_title: this.myForm.value.title,
      comment_count: 0,
      comment_status: "open",
      guid: this.constants.FRONTEND_ENDPOINT + this.strHelper.unicode2ansi(this.myForm.value.title).replace(' ', '-'),
      menu_order: 0,
      ping_status: "open",
      pinged: "",
      post_content_filtered: "",
      post_date: new Date(),
      post_date_gmt: new Date(),
      post_excerpt: "",
      post_mime_type: "",
      post_modified: new Date(),
      post_modified_gmt: new Date(),
      post_name: this.strHelper.unicode2ansi(this.myForm.value.title).replace(' ', '-'),
      post_parent: 0,
      post_password: "",
      post_status: "publish",
      post_type: "post",
      to_ping: ""
    }

    this._apiHttpService.post(this._apiEndpointsService.postNewEntry(), newEntry)
    .subscribe(data => {
      console.log(data);
    })
    ;
  }
}
