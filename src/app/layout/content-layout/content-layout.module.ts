import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentLayoutComponent } from './content-layout.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';
import { AuthorBoxModule } from '../../@themes/widgets/author-box/author-box.module';
import { SearchBarModule } from '../../@themes/widgets/search-bar/search-bar.module';
import { EntryListModule } from '../../@themes/widgets/entry-list/entry-list.module';

@NgModule({
  declarations: [ ContentLayoutComponent ],
  exports: [ ContentLayoutComponent ],
  imports: [
    /** Angular Modules */
    CommonModule,
    RouterModule,

    /** Project modules */
    HeaderModule,
    FooterModule,
    AuthorBoxModule,
    SearchBarModule,
    EntryListModule,
  ],
  providers: []
})
export class ContentLayoutModule { }
