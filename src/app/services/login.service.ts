import { Injectable } from '@angular/core';
import { LoginViewModel } from '../models/login-view-model';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpClient: HttpClient;

  constructor(
    private httpBackend: HttpBackend, 
    private jwtHelperService: JwtHelperService) {

    this.currentUserName = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")).userName : null;
  }

  currentUserName: string = null;

  public Login(loginViewModel: LoginViewModel): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>("http://localhost:54573/authenticate", loginViewModel, { responseType: "json", observe: "response" })
      .pipe(map(response => {
        if (response) {
          this.currentUserName = response.body.userName;
          sessionStorage.currentUser = JSON.stringify(response.body);
          sessionStorage.XSRFRequestToken = response.headers.get("XSRF-REQUEST-TOKEN");
        }

        return response.body;
      }));
  }

  public Logout() {
    sessionStorage.removeItem("currentUser");
    this.currentUserName = null;
  }

  public isAuthenticated(): boolean {
    var token = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")).token : null;
    if (this.jwtHelperService.isTokenExpired()) {
      return false; //token is not valid
    }
    else {
      return true; //token is valid
    }
  }
}
