import {ErrorHandler, Injectable} from "@angular/core";
import {LogService} from "../log.service";
import {HttpErrorResponse, HttpRequest} from "@angular/common/http";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(    private logger: LogService  ) {

  }

  handleError(error: any) {
    // Check if it's an error from an HTTP response
    if ((error instanceof HttpErrorResponse)) {
      //error = error.rejection; // get the error object
      this.logger.error(error.message,"",error.status);
    } else
      this.logger.error(error.message, error.stack);
  }


}
