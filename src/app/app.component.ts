import {Component, OnInit} from '@angular/core';
import {LogService} from "./shared/log.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'log-service-app';

  constructor(private logger: LogService) {
    console.log("Constractor");
  }

  ngOnInit(): void {

  }

}
