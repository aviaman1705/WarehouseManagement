import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APP_CONFIG, AppConfig } from 'src/app/app-config.module';
import { LocationService } from '../../services/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../../models/location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {

  location: Location = new Location();
  submitted = false;
  locationId: number = null;
  editMode: boolean = false;
  pageTitle: string = null;
  btnText: string = null;
  locationForm: FormGroup;
  isAllreadyExsist: boolean = false;
  currentLocation: string = null;

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private locationService: LocationService,
    public fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.locationForm = this.fb.group({
      place: ['', [Validators.required]] //להוסיף ולידציה לתחביר מיקום
    })


    // Route parameters
    this.activatedRoute.params.subscribe(params => {
      this.locationId = params['id'];

      if (this.locationId != null) {
        this.locationService.getLocation(this.locationId).subscribe(
          (response: Location) => {
            this.location = response;
            this.currentLocation = response.place;
            this.editMode = true;
            this.pageTitle = 'עריכת מיקום';
            this.btnText = config.edit;
          }
        )
      }
    });

    this.pageTitle = 'הוספת מיקום';
    this.btnText = config.add;
  }

  get f() { return this.locationForm.controls; }

  // Submit Add New Location
  onSubmit() {
    this.submitted = true;
    if (this.locationForm.invalid) {
      return;
    }

    if (this.editMode == true) {
      this.locationService.updateLocation(this.location).subscribe(
        (response: Location) => {
          this.location = response;
        }
      )
    }

    this.locationService.addLocation(this.location).subscribe(
      (response: Location) => {
        this.router.navigate(['/admin/locations']);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  onKeyUp($event) {
    if (this.currentLocation != $event.target.value) {
      this.locationService.search(($event.target.value == '' ? 'empty' : $event.target.value)).subscribe(
        (response: number) => {
          if (response == -1) {
            this.isAllreadyExsist = true;
          } else
            this.isAllreadyExsist = false;
        }
      )
    } else {
      this.isAllreadyExsist = false;
    }
  }

}
