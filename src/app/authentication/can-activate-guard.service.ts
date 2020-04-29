import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate {

  constructor(

    private loginService: LoginService,
    private router: Router,
    private jwtHelperService: JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    var token = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")).token : null;

    let isAuthenticated = this.loginService.isAuthenticated();
    let role = this.jwtHelperService.decodeToken(token).role.toLowerCase();
    let expectedRole = (route.data.expectedRole != undefined) ? route.data.expectedRole.toLowerCase() : false;

    if (isAuthenticated && role == expectedRole) {
      return true; //the user can navigate to the particular route
    }
    else {
      this.router.navigate(["login"]);
      return false; //the user can't navigate to the particular route 
    }
  }
}
