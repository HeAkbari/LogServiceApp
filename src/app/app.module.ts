import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LogTestComponent} from "./log-test/log-test.component";
import {LogService} from "./shared/log.service";
import {LogPublisherService} from "./shared/log-publisher-service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LogTestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [LogService,LogPublisherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
