import {Component} from '@angular/core';
import {LogService} from "./shared/log.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'log-service-app';

  constructor(private logger: LogService) {

  }

}
