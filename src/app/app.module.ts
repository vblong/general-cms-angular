import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../app/material/material.module';
import { HttpClientModule  } from '@angular/common/http';

import { fakeBackendProvider } from './helpers/fake-backend';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AdminBarModule } from './layout/admin-bar/admin-bar.module';
import { FooterModule } from './layout/footer/footer.module';
import { HeaderModule } from './layout/header/header.module';
import { AuthorBoxModule } from './@themes/widgets/author-box/author-box.module';
import { SearchBarModule } from './@themes/widgets/search-bar/search-bar.module';
import { EntryListModule } from './@themes/widgets/entry-list/entry-list.module';
import { ContentLayoutModule } from './layout/content-layout/content-layout.module';
import { EntryModule } from './layout/entry/entry.module';
import { NotFoundModule } from './layout/not-found/not-found.module';
import { ComingSoonModule } from './layout/coming-soon/coming-soon.module';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,

    NotFoundModule,
    ComingSoonModule,

    ContentLayoutModule,
    EntryModule,
    AdminBarModule,
    HeaderModule,
    FooterModule,
    AuthorBoxModule,
    SearchBarModule,
    EntryListModule,

    MatProgressSpinnerModule,
    MatPaginatorModule,

    SocialLoginModule
  ],
  providers: [
    fakeBackendProvider,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '445892489232-kets77giu5ee6agmvkpkcj1o62n9k0fc.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
