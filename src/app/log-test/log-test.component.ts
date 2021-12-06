import {Component} from "@angular/core";
import {LogService} from "../shared/log.service";

@Component(
  {
    selector: "log-test",
    templateUrl: "./log-test.component.html"
  }
)
export class LogTestComponent {

  constructor(private logger: LogService) {

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
    this.logger.log("test the `log()` Metod");
  }
}
