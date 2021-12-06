import {Injectable} from "@angular/core";
import {LogPublisher, LogConsole, LogLocalStorage, LogWebApi, LogPublisherConfig} from "./log-publishers";
import {HttpClient} from "@angular/common/http";
import {Observable, of, Subject, throwError} from "rxjs";

const PUBLISHERS_FILE = "/assets/mock/log-publisher.json";

@Injectable()
export class LogPublisherService {

  constructor(private http: HttpClient) {
    this.buildPublishers();
  }

  publishers: LogPublisher[] = [];

  // Build publishers array
  buildPublishers(): void {
   /*
    this.publishers.push(new LogConsole());
    this.publishers.push(new LogLocalStorage());
    this.publishers.push(new LogWebApi(this.http));
    */
    let logPub: LogPublisher;

    this.getLoggers().subscribe(response => {
      for (let pub of response.filter(p => p.isActive)) {
        // @ts-ignore
        switch (pub.loggerName.toLowerCase()) {
          case "console":
            logPub = new LogConsole();
            break;
          case "localstorage":
            logPub = new LogLocalStorage();
            break;
          case "webapi":
            logPub = new LogWebApi(this.http);
            break;
        }

        // Set location of logging
        // @ts-ignore
        logPub.location = pub.loggerLocation;

        // Add publisher to array
        this.publishers.push(logPub);
      }
    });

  }

  getLoggers(): Observable<LogPublisherConfig[]> {
    return this.http.get<LogPublisherConfig[]>(PUBLISHERS_FILE);
  }

  private handleErrors(error: any):Observable<any> {
    let errors: string[] = [];
    let msg: string = "";

    msg = "Status: " + error.status;
    msg += " - Status Text: " + error.statusText;
    if (error.json()) {
      msg += " - Exception Message: " + error.json().exceptionMessage;
    }
    errors.push(msg);
    console.error('An error occurred', errors);
    return throwError(errors);
  }
}
