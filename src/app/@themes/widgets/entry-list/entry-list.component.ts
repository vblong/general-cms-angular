import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { shareReplay } from 'rxjs/operators';
import { ApiEndpointsService } from 'src/app/service/api-endpoints.service';
import { ApiHttpService } from 'src/app/service/api-http-service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  entries: any = [];
  pageIndex = 1;
  paginatorIndex = 0;
  pageSize: number = 10;
  totalEntries: number = 0;
  totalPage: number = 0;
  lowValue: number = 0;
  highValue: number = 20;
  isLoading: boolean = true;

  $entries: any;
  $totalEntris: any;

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(
    private _snackBar: MatSnackBar,
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //  Get latest 10 entries
    this.updateEntry();


  }

  updateEntry() {
    //  Get latest 10 entries
    let thisPtr: any = this;
    thisPtr.isLoading = true;
    let api = this._apiEndpointsService.getEntriesEndpoint(thisPtr.pageIndex, thisPtr.pageSize);
    this.$entries = this._apiHttpService.get(api).pipe(shareReplay());
    this.$entries
    .subscribe(
      data => {
        console.log("Entries retrieve");
        thisPtr.entries = data;
        thisPtr.updateTotalEntries();
      }, error => {
        console.log("Error while retrieving entries. Retrying...");
        console.log(error);
        this.updateEntry();
      }
    );
    //  Get total number of entries
    // this.updateTotalEntries();
  }

  updateTotalEntries() {
    let thisPtr:any = this;
    this.$totalEntris = this._apiHttpService.get(this._apiEndpointsService.getTotalEntriesEndpoint()).pipe(shareReplay());
    this.$totalEntris
    .subscribe(data => {
      thisPtr.totalEntries = data;
      thisPtr.totalPage = thisPtr.totalEntries / thisPtr.pageSize + 1;
      thisPtr.isLoading = false;
    });
  }

  openSnackBar() {
    this._snackBar.open("Under development", "Close", {
      duration: 3000
    });
  }

  nextPage() {
    console.log("Go to next");
  }

  prevPage() {
    console.log("Go to prev");
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.pageIndex = event.pageIndex + 1;
    this.paginatorIndex = event.pageIndex; // - 1;
    this.pageSize = event.pageSize;
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    this.updateEntry();
    this.updateTotalEntries();
    // this._router.navigate(['/entry'], { queryParams: { index: this.pageIndex }});
    return event;
  }
}
