import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private loadingNavBarSubject = new BehaviorSubject(true);
  public loadingNavBar$ = this.loadingNavBarSubject.asObservable();

  private classWithMarginSubject = new BehaviorSubject(true);
  public classWithMargin$ = this.classWithMarginSubject.asObservable();

  

  constructor() { }

  changeNavBarStatus(status: boolean) {
    this.loadingNavBarSubject.next(status);
  }

  setClassWithMarginSubject(margin:boolean){
    this.classWithMarginSubject.next(margin);
  }
}
