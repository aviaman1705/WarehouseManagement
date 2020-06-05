import { Component, OnInit, Inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../models/dashboard';
import { DataService } from 'src/app/shared/data.service';
import { AppConfig, APP_CONFIG } from 'src/app/app-config.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboard: Dashboard = new Dashboard();

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
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
