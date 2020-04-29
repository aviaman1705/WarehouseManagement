import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  constructor(private data: DataService) {
    this.data.setClassWithMarginSubject(true);
  }

  ngOnInit() {
  }

}
