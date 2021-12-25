import { Component, OnInit } from '@angular/core';
import { ApiEndpointsService } from 'src/app/service/api-endpoints.service';
import { ApiHttpService } from 'src/app/service/api-http-service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {

  columns: string[] = ['post_author', 'post_title', 'post_status', 'post_modified'];
  entries: any;
  crudAPI: any = {
    'delete' : {'endpoint': 'delete-entry'}
  };
  pageSize: number = 5;

  constructor(
    private _apiHttpService: ApiHttpService,
    private _apiEndpointService: ApiEndpointsService
  ) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getData(): void {
    this._apiHttpService.get(this._apiEndpointService.getAllEntryBrief())
    .subscribe(
      data => { this.entries = data; },
      error => { }
    )
  }
}
