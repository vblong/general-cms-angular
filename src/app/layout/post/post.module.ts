import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostComponent } from './post.component';
import { TinyMCEComponent } from './tiny-mce/tiny-mce.component';

@NgModule({
  declarations: [ PostComponent, TinyMCEComponent ],
  exports: [ PostComponent ],
  imports: [
    CommonModule
  ]
})
export class PostModule { }
