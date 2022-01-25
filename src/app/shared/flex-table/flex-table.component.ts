import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiEndpointsService } from 'src/app/service/api-endpoints.service';
import { ApiHttpService } from 'src/app/service/api-http-service';

@Component({
  selector: 'app-flex-table',
  templateUrl: './flex-table.component.html',
  styleUrls: ['./flex-table.component.scss']
})
export class FlexTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() data;
  @Input() pageSize = 10;
  @Input() displayedColumns: string[];
  @Input() crudAPI: any[] = [{}];
  @Input() showFilter: boolean = true;
  @Input() showPaginator: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  dataTable: MatTableDataSource<any>;

  constructor(
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('data')) {
      if(this.data) this.data.forEach(element => { element.edit = false; });
      this.dataTable = new MatTableDataSource(this.data);
      this.dataTable.paginator = this.paginator;
      this.dataTable.sort = this.sort;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(this.displayedColumns) this.displayedColumns.push('Action');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();

    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage();
    }
  }

  updateRow(row: any) {
    if(!this.crudAPI['update']) {
      this._snackBar.open("Update API endpoint not provided", "Close", { duration: 5000});
    }
  }

  editRow(row: any) {
    if(!this.crudAPI['edit']) {
      this._snackBar.open("Edit API endpoint not provided", "Close", { duration: 5000});
    }
  }

  deleteRow(row: any) {
    if(!this.crudAPI['delete']) {
      this._snackBar.open("Delete API endpoint not provided", "Close", { duration: 5000});
      return;
    }

    if(!row.ID) {
      this._snackBar.open("This row does not contain an ID", "Close", { duration: 5000});
      return;
    }

    this._apiHttpService.delete( this._apiEndpointsService.createUrlWithPathVariables(this.crudAPI['delete'].endpoint, [row.ID]) )
    .subscribe(result => {
      this._snackBar.open("'" + row.post_title + "' Deleted", "Close", { duration: 2000 });
      this.dataTable = new MatTableDataSource(this.dataTable.data.filter((v, _) => {
        return v.ID != row.ID;
      }));
      this.dataTable.paginator = this.paginator;
      this.dataTable.sort = this.sort;
    });
  }
}
