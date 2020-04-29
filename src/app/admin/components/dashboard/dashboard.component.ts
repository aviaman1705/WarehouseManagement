import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../models/dashboard';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboard: Dashboard = new Dashboard();

  constructor(
    private dashboardService: DashboardService,
    private data: DataService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dashboardService.getData().subscribe(
      (response: Dashboard) => {
        this.dashboard = response;
      }
    )

    this.data.changeNavBarStatus(true);
  }
}
