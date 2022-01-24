import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AsyncSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entry } from 'src/app/@core/types/entry';
import { ApiEndpointsService } from 'src/app/service/api-endpoints.service';
import { ApiHttpService } from 'src/app/service/api-http-service';

import { StringHelper } from 'src/app/helpers/string-helper';
import { Constants } from 'src/app/config/constants';
import { FlexCheckboxComponent } from 'src/app/shared/flex-checkbox/flex-checkbox.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {

  private editorSubject: Subject<any> = new AsyncSubject();
  private strHelper: StringHelper;

  categories: any;
  chosenCategories: boolean[];

  @ViewChild(FlexCheckboxComponent) checkbox: FlexCheckboxComponent;

  constructor(private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
    public constants: Constants,
    private _snackbar: MatSnackBar) {
      this.strHelper = new StringHelper();
  }

  ngOnInit(): void {
    this.getAllCategories();

  }

  public myForm = new FormGroup({
    title: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required)
  });

  handleEditorInit(e) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  onSubmit() {
    console.log(this.chosenCategories);
    if(this.myForm.valid) {
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
        let post: any[] = [data];
        console.log(data);

        this._snackbar.open(newEntry.post_title + " posted", "Close", { duration: 5000 });
        let catIDs: number[] = [];
        for(const i in this.chosenCategories) {
          if(this.chosenCategories[i])
            catIDs.push(this.categories[i].term_id);
        }
        console.log("??? ???", post[0].ID, catIDs);
        this._apiHttpService.post(this._apiEndpointsService.modifyPostCategories(post[0].ID, catIDs), [])
        .subscribe(result => {
          console.log("categories modified", result);
        },
        error => {
          console.log("categories NOT modified", error);
        });
      });
    }
  }

  getAllCategories() {
    return this._apiHttpService.get(this._apiEndpointsService.getAllTermsEndpoint())
    .subscribe(data => {
      this.categories = data;
      this.chosenCategories = Array<boolean>(this.categories.length).fill(false);
    });
  }

  /**
   *
   * @param event
   * {
   *  - item: name of category
   *  - value: true | false <=> checked or not checked
   *  - index: index in this.categories
   * }
   * Example { item: 'Typescript', value: true, index: 3 }
   */
  categorySelected(event: any) {
    this.chosenCategories[event.index] = event.value;
  }
}
