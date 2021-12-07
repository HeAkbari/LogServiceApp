import {Injectable} from "@angular/core";
import {LogPublisher} from "./log-publishers";
import {LogPublisherService} from "./log-publisher-service";

@Injectable()
export class LogService {
  constructor(private publishersService: LogPublisherService) {
    this.publishers = publishersService.publishers;

  }

  level: LogLevel = LogLevel.All;
  logWithDate = true;
  publishers: LogPublisher[] = [];
  logArray: string[] = [];

  private shouldLog(level: LogLevel): boolean {
    let ret: boolean = false;
    if ((level >= this.level && level !== LogLevel.Off) || this.level === LogLevel.All) {
      ret = true;
    }
    return ret;
  }

  writeToLog(msg: string, level: LogLevel, stackTrace: string,statusCode: number|undefined, params: any[] | undefined = undefined) {
    if (this.shouldLog(level)) {
      let entry: LogEntry = new LogEntry();
      entry.message = msg;
      entry.statusCode = statusCode?statusCode:undefined;
      entry.levelState = LogLevel[level];
      entry.stackTrace = stackTrace;
      entry.extraInfo = params?.length ? params : undefined;
      for (let publisher of this.publishers) {
        publisher.log(entry).subscribe(response => console.log(response));
      }
    }
  }

  debug(msg: string, stackTrace: string = "",statusCode: number|undefined=undefined, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, stackTrace,statusCode, optionalParams);
  }

  info(msg: string, stackTrace: string = "",statusCode: number|undefined=undefined, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, stackTrace,statusCode, optionalParams);
  }

  warn(msg: string, stackTrace: string = "",statusCode: number|undefined=undefined, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, stackTrace,statusCode, optionalParams);
  }

  error(msg: string, stackTrace: string = "",statusCode: number|undefined=undefined, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, stackTrace,statusCode, optionalParams);
  }

  fatal(msg: string, stackTrace: string = "",statusCode: number|undefined=undefined, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, stackTrace,statusCode, optionalParams);
  }

  log(msg: string, stackTrace: string = "",statusCode: number|undefined=undefined, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, stackTrace ,statusCode, optionalParams);
  }
}


// export enum LogLevel {
//   All = "All",
//   Debug = "Debug",
//   Info = "Info",
//   Warn = "Warn",
//   Error = "Error",
//   Fatal = "Fatal",
//   Off = "Off"
// }
export enum LogLevel {
  All = 1,
  Debug = 2,
  Info = 3,
  Warn = 4,
  Error = 5,
  Fatal = 6,
  Off = 7
}

export class LogEntry {
  entryDate: Date = new Date();
  message: string = "";
  statusCode:number|undefined=undefined;
  levelState: string = LogLevel[LogLevel.Debug];
  //levelCode: LogLevel = LogLevel.Debug;
  stackTrace: string = "";
  extraInfo: any[] | undefined = undefined;

  //logWithDate: boolean = true;

  buildLogString(): string {
    let ret: string = "";
    ret = new Date() + " - ";


    ret += "Type: " + this.levelState;
    ret += " - Message: " + this.message;
    if (this.stackTrace.length) {
      ret += " - StackTrace: " + this.stackTrace
    }
    if (this.extraInfo) {
      ret += " - Extra Info: " + this.formatParams(this.extraInfo);
    }
    return ret;
  }

  private formatParams(params: any[]): string {
    let ret: string = params.join(",");
    if (params.some(params => typeof params == "object")) {
      ret = "";
        for (let item of params) {
          ret += JSON.stringify(item) + ",";
        }
    }
    return ret;
  }
}
