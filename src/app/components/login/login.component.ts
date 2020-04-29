import { Component, OnInit, ViewChild, Output, EventEmitter, ChangeDetectorRef,AfterContentChecked } from '@angular/core';
import { LoginViewModel } from '../../models/login-view-model';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {

  loginViewModel: LoginViewModel = new LoginViewModel();
  loginError: string = "";
  @ViewChild("newForm", { static: false }) newForm: NgForm;

  message: string = "Hola Mundo!"
  showNavBar: boolean = false;
  status: boolean;

  @Output() messageEvent = new EventEmitter<string>();


  constructor(
    private loginService: LoginService,
    private router: Router,
    private data: DataService) { }

  ngOnInit() {
    this.isAuthenticated();
    this.data.changeNavBarStatus(false);
    this.data.setClassWithMarginSubject(false);
  }

  test(s: boolean) {
    this.status = s
  }

  onLoginClick(event) {
    if (this.newForm.valid) {
      this.loginService.Login(this.loginViewModel).subscribe(
        (response) => {
          this.newForm.resetForm();
          this.router.navigateByUrl("/admin/dashboard");
        },
        (error) => {
          this.loginError = error.error.message;
        }
      );
    }
  }

  isAuthenticated() {
    if (this.loginService.isAuthenticated())
      this.router.navigateByUrl("/admin/dashboard");
  }
}
