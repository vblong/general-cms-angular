import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Entry } from 'src/app/@core/types/entry';
import { ApiEndpointsService } from 'src/app/service/api-endpoints.service';
import { ApiHttpService } from 'src/app/service/api-http-service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  post_id: number;
  entry: Entry;

  constructor(
    private _snackBar: MatSnackBar,
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
    private _route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.entry = {
      post_title: '',
      post_author: 0,
      post_content: ''
    }
    this._route.queryParams.subscribe(params => {
      if(params.hasOwnProperty('post_id')) {
        this.post_id = params['post_id'];
        this.getEntry();
      }
    });
  }

  getEntry() {
    this._apiHttpService.get(this._apiEndpointsService.getEntryEndpoint(this.post_id))
    .subscribe(
      data => {
        this.entry = data[0];
        console.log(this.entry);
      }, error => {
        console.log("Error while retrieving entry. Retrying...");
        console.log(error);
        this.getEntry();
      }
    );
  }

}
