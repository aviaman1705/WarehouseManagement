import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListItem } from '../models/list-item';

@Injectable({
  providedIn: 'root'
})
export class ListItemService {

  private listItemUrl: string = `${environment.apiUrl}lists`;
  constructor(private httpClient: HttpClient) { }

  getHours(): Observable<ListItem[]> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);

    return this.httpClient.get<ListItem[]>(`${this.listItemUrl}/hours`, { headers: requestHeaders, responseType: "json" });
  }
}
