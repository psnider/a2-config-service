import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';

// Imports for loading & configuring the in-memory web api
// import { XHRBackend } from '@angular/http';

import { AppComponent }   from './app.component';
import { ConfigurationService }      from './config.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    ConfigurationService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
