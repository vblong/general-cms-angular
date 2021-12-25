import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [

  ]
})

export class HeaderModule { }
