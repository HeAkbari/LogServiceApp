import {Component} from "@angular/core";
import {LogService} from "../shared/log.service";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {of, throwError} from "rxjs";

@Component(
  {
    selector: "log-test",
    templateUrl: "./log-test.component.html"
  }
)
export class LogTestComponent {

  constructor(private logger: LogService, private http: HttpClient) {

  }

  testInfo(): void {
    this.logger.info("test the `info()` Metod");
  }

  testWarn(): void {
    this.logger.warn("test the `warn()` Metod");
  }

  testError(): void {
    this.logger.error("test the `error()` Metod");
  }

  testFatal(): void {
    this.logger.fatal("test the `fatal()` Metod");
  }

  testLog(): void {
    this.logger.log("test the `log()` Metod","",undefined,{'status':200,'info':'test'});
  }

  testHttpInterceptorError() {
    data: {    }    ;
    this.http.get('https://localhost:7213/user').pipe(
      catchError(err => (throwError(err))) // return a Observable with a error message to display
    ).subscribe(data => data = data);
  }

  testUnHandeledError() {

    let value=['a','b','c'];
    console.log(value[10].length);
  }
  testHandeledError() {
    try {
      let value = ['a', 'b', 'c'];
      console.log(value[10].length);
    }
    catch (error){
      throw new Error('parsing data is not possible');
    }
  }
}
