import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator}  from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiEndpointsService } from 'src/app/service/api-endpoints.service';
import { ApiHttpService } from 'src/app/service/api-http-service';
import { Category } from '../../../@core/types/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['ID', 'Name', 'Slug', 'Term Group', 'Action'];
  dataSource: MatTableDataSource<Category>;

  newCategoryForm = new FormGroup({
    name: new FormControl("", Validators.required),
    slug: new FormControl("")
  });

  $terms: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadCategories();
  }

  loadCategories(): void {
    this._apiHttpService.get(this._apiEndpointsService.getAllTermsEndpoint())
    .subscribe(data => {
        this.$terms = data;
        this.$terms.forEach(element => {
          element.edit = false;
        });
        this.dataSource = new MatTableDataSource(this.$terms);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }, error => {
        console.log("Error while retrieving terms. Retrying...");
        console.log(error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addNew() {
    if(this.newCategoryForm.valid) {
      let newName: string = this.newCategoryForm.value.name;
      let newSlug: string = this.newCategoryForm.value.slug;
      if(newSlug.length === 0)
        newSlug = newName.split(' ').join('-');
      let newCategory: Category = {
        term_id: 0,
        name: newName,
        slug: newSlug.toLowerCase(),
        term_group: 0
      };
      this._apiHttpService.post(this._apiEndpointsService.postNewCategory(), newCategory)
      .subscribe(data => {
        this._snackBar.open(newName + " added", "Close", { duration: 2000 });
        this.loadCategories();
      });
    }
  }

  editRow(row: any) {
    this.$terms.forEach(element => {
      if(element.term_id == row.term_id) element.edit = true;
    });
  }

  approveEdit(event: any, term_id, name, slug, term_group) {
    if(event.key === "Enter") {
      this.updateCategory(term_id, name, slug, term_group);
    }
  }

  updateCategory(term_id: any, name: string, slug: string, term_group: any) {
    if(slug.length === 0) slug = name.toLowerCase().split(' ').join('-');

    this._apiHttpService.put(this._apiEndpointsService.updateCategory(), { term_id, name, slug, term_group })
    .subscribe(result => {
      this.loadCategories();
    });
    this.$terms.forEach(element => {
      if(element.term_id == term_id) element.edit = false;
    });;
  }

  deleteRow(row: any) {
    this._apiHttpService.delete(this._apiEndpointsService.deleteCategory(row.term_id))
    .subscribe(result => {
      this._snackBar.open("Deleted", "Close", { duration: 2000 });
      this.loadCategories();
    });
  }
}
