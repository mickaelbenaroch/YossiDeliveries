import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import {PagesEnum} from './enums/pages.enum';
import { Router } from '@angular/router';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'YossDeliveries';
  public page:PagesEnum;
  pageenum = PagesEnum;

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    let currentUrl = location.pathname;
    if (currentUrl === '/' && this.page === PagesEnum.DeliverersList) {
      this.page = PagesEnum.Loggin;
      this.userService.deliverers = [];
      this.userService.hoursArray = [];
    }
    if (currentUrl === '/list' && this.page !== PagesEnum.DeliverersList) {
      this.router.navigateByUrl('');
      this.page = PagesEnum.DeliverersList;
    }
  }

  constructor(private router: Router, public userService: UserServiceService) {}

  ngOnInit() {
    this.page = PagesEnum.Loggin;
  }
  ngOnDestroy() {
    this.userService.isUserLoggedIn = false;
  }

  CheckUrl(pathname: string) {
    if (pathname === '/list' && this.page !== PagesEnum.DeliverersList) {
      this.router.navigateByUrl('');
    }
  }

  LoggedInCallback(page: PagesEnum) {
    if (page) {
      switch(page) {
        case PagesEnum.AddDeliver:
          this.page = PagesEnum.AddDeliver;
          break;
        case PagesEnum.DeliverersHours:
          this.page = PagesEnum.DeliverersHours;
          break;
        case PagesEnum.DeliverersList:
          this.userService.isUserLoggedIn = true;
          this.page = PagesEnum.DeliverersList;
          break;
        case PagesEnum.Loggin:
          this.page = PagesEnum.Loggin;
          break;
      }
    }
  }
}
