import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '../../models/location';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Location> = new Subject();
  locations: Location[] = [];

  constructor(
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        'search': 'חפש',
        lengthMenu: "רשומות _MENU_",
        info:'',
        "paginate": {
          "first": "ראשון",
          "previous":'הקודם',
          "next": "הבא",
          'last':'אחרון'
        }
      }
    };

    this.loadLocations();
  }


  loadLocations() {
    this.locationService.getLocations()
      .subscribe(locations => {
        this.locations = locations;
        this.dtTrigger.next();
      });
  }

  edit(locationId: string) {
    this.router.navigate(['admin/location', locationId]);
  }

  delete(location: Location) {
    if (confirm("Are you sure to delete " + location.id)) {

      const index = this.locations.indexOf(location, 0);
      if (index > -1) {
        this.locations.splice(index, 1);

        this.locationService.deleteLocation(location.id.toString()).subscribe(
          (response: number) => {
            console.log(response + 'נמחק בהצלחה');
          }
        )
      }
    }
  }
}
