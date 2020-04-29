import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToDo } from '../../models/to-do';
import { LoginService } from '../../services/login.service';
import { DataService } from '../data.service';


@Component({
  selector: '[myTd]',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navBarStatus: boolean = true;
  
  todos: ToDo[];
  searchText: string = "";
 
  @ViewChild("searchInput", { static: false }) searchInputView: ElementRef;

  constructor(
    private data: DataService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.data.loadingNavBar$.subscribe(navBarStatus => this.x(navBarStatus));
  }

  x(b: boolean) {
    this.navBarStatus = b;
  }

  search() {
    alert(this.searchInputView.nativeElement.value);
  }
}
