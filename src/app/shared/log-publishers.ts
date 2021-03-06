import {Observable, of, Subject, throwError} from "rxjs";
import {LogEntry, LogLevel} from "./log.service";
import {HttpClient, HttpHeaders} from '@angular/common/http';


export abstract class LogPublisher {
  location: string = "";

  abstract log(record: LogEntry): Observable<boolean>

  abstract clear(): Observable<boolean>;
}

export class LogConsole extends LogPublisher {
  clear(): Observable<boolean> {
    console.clear()
    return of(true);
  }

  log(entry: LogEntry): Observable<boolean> {
    console.log(entry.buildLogString());
    return of(true);
  }

}

export class LogLocalStorage extends LogPublisher {
  constructor(private http: HttpClient) {
    // Must call `super()`from derived classes
    super();
    // Set location
    this.location = "logging";
    this.checkLocalStorageReadyToClear().subscribe((response: any) => {
      if (response) {
        var logger = new LogWebApi(this.http);
        logger.logs(response)
          .subscribe(
            () => this.clear(),
            error => throwError(error));
      }
    })
  }

  // Append log entry to local storage
  log(entry: LogEntry): Observable<boolean> {
    let ret: boolean = false;
    let values: LogEntry[];

    try {
      // Get previous values from local storage
      // @ts-ignore
      values = JSON.parse(localStorage.getItem(this.location)) || [];

      // Add new log entry to array
      values.push(entry);

      // Store array into local storage
      localStorage.setItem(this.location, JSON.stringify(values));

      // Set return value
      ret = true;
    } catch (ex) {
      // Display error in console
      console.log(ex);
    }

    return of(ret);
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return of(true);
  }

  checkLocalStorageReadyToClear(): Observable<boolean> {
    // Get previous values from local storage
    // @ts-ignore
    let values = JSON.parse(localStorage.getItem(this.location)) || [];
    values= values.length >= 5?values:undefined;
    return of(values)
  }
}

export class LogWebApi extends LogPublisher {
  constructor(private http: HttpClient) {
    // Must call `super()`from derived classes
    super();

    // Set location
    this.location = "https://localhost:7213/Log";
  }

  // Add log entry to back end data store
  log(entry: LogEntry): Observable<boolean> {
    var data: boolean = false;
    var subject = new Subject<boolean>();
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    // let options = new RequestOptions({ headers: headers });

    this.http.post("https://localhost:7213/Log", entry, {headers: headers})
      .subscribe(
        (response: any) => {
          data = response;
          subject.next(data);
        },
        error => (this.handleErrors)
      );
    return subject.asObservable();
  }

  logs(values: LogEntry[]) {
    var data: boolean = false;
    var subject = new Subject<boolean>();
    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post("https://localhost:7213/Log", values, {headers: headers})
      .subscribe(
        (response: any) => {
          data = response;
          subject.next(data);
        },
        error => (this.handleErrors)
      );
    return subject.asObservable();
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    // TODO: Call Web API to clear all values
    return of(true);
  }

  private handleErrors(error: any): Observable<any> {
    let errors: string[] = [];
    let msg: string = "";

    msg = "Status: " + error.status;
    msg += " - Status Text: " + error.statusText;
    if (error.json()) {
      msg += " - Exception Message: " + error.json().exceptionMessage;
    }
    errors.push(msg);

    // console.error('An error occurred', errors);
    return throwError(errors);
  }

}

export class LogPublisherConfig {
  loggerName: string | undefined;
  loggerLocation: string | undefined;
  isActive: boolean | undefined;
}
