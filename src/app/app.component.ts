import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'TaskManager';
  message: string = "login page";
  @Input() classWithMargin: boolean;

  constructor(private data: DataService) {

    this.data.classWithMargin$.subscribe(classWithMargin => this.setData(classWithMargin));

  }

  setData(classWithMargin: boolean) {
    this.classWithMargin = classWithMargin;
  }

  ngOnInit() { }
}
