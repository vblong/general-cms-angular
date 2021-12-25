import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorBoxComponent } from './reusables/author-box/author-box.component';
import { SearchBarComponent } from './widgets/search-bar/search-bar.component';
import { EntryListComponent } from './widgets/entry-list/entry-list.component';
import { SideMenuComponent } from './widgets/side-menu/side-menu.component';



@NgModule({
  declarations: [AuthorBoxComponent, SearchBarComponent, EntryListComponent, SideMenuComponent],
  imports: [
    CommonModule
  ]
})
export class ThemeModule { }
