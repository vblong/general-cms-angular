import { Component, OnInit } from '@angular/core';
import { ApiEndpointsService } from 'src/app/service/api-endpoints.service';
import { ApiHttpService } from 'src/app/service/api-http-service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {

  columns: string[] = ['post_author', 'post_title', 'post_category', 'post_status', 'post_modified'];
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
    console.log("???");
    this._apiHttpService.get(this._apiEndpointService.getAllEntryBrief())
    .subscribe(
      data => {
        console.log(this.entries);
        // this.entries = data;
        this.getDataCategories();
      },
      error => { }
    )
  }

  /**
   *  API Return type example:
   *  { term_group, name, slug, term_id }
   */
  getDataCategories() {
    for(const entry of this.entries) {
      this._apiHttpService.get(this._apiEndpointService.getPostCategories(entry.ID))
      .subscribe(data => {
        data = data.slice(0);
        let cats: string[] = [];
        for(const dat in data) {
          cats.push(data[dat].name);
        }

        entry['post_category'] = cats;
      });
    }
  }
}
