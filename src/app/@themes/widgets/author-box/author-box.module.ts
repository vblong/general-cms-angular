import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorBoxComponent } from './author-box.component';

@NgModule({
  declarations: [ AuthorBoxComponent ],
  exports: [ AuthorBoxComponent ],
  imports: [
    CommonModule
  ]
})
export class AuthorBoxModule { }
