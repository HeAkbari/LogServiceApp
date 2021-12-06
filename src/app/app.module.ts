import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LogTestComponent} from "./log-test/log-test.component";
import {LogService} from "./shared/log.service";
import {LogPublisherService} from "./shared/log-publisher-service";
import {HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor} from "@angular/common/http";
import { GlobalErrorHandler} from "./shared/errors/global-error-handler";
import {HttpLoadingInterceptor} from "./shared/errors/http-loading-interceptor";

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
  providers: [
    LogService,
    LogPublisherService,
    {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass:HttpLoadingInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
