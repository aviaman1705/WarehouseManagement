import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locationUrl: string = `${environment.apiUrl}locations`;
  constructor(private httpClient: HttpClient) { }

  getLocations(): Observable<Location[]> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);
    return this.httpClient.get<Location[]>(`${this.locationUrl}`, { headers: requestHeaders, responseType: "json" });
  }

  getLocation(id: number): Observable<Location> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);
    return this.httpClient.get<Location>(`${this.locationUrl}/${id}`, { headers: requestHeaders, responseType: "json" });
  }

  addLocation(newLocation: Location): Observable<Location> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);
    return this.httpClient.post<Location>(this.locationUrl, newLocation, { headers: requestHeaders, responseType: "json" });
  }

  updateLocation(exsitingLocation: Location): Observable<Location> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);
    return this.httpClient.put<Location>(this.locationUrl + '/UpdateLocationDetails/',exsitingLocation, { headers: requestHeaders, responseType: "json" });
  }

  deleteLocation(id: string): Observable<number> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);
    return this.httpClient.delete<number>(this.locationUrl + '/Delete?id=' + id, { headers: requestHeaders, responseType: "json" });
  }

  search(value: string): Observable<number> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);
    return this.httpClient.get<number>(this.locationUrl + "/search/" + value, { headers: requestHeaders, responseType: "json" });
  }
}
