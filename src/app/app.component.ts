import { Component, OnInit, HostListener } from '@angular/core';
import {PagesEnum} from './enums/pages.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'YossDeliveries';
  public page:PagesEnum;
  pageenum = PagesEnum;

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    let currentUrl = location.pathname;
    if (currentUrl === '/' && this.page === PagesEnum.DeliverersList) {
      this.page = PagesEnum.Loggin;
    }
    if (currentUrl === '/list' && this.page !== PagesEnum.DeliverersList) {
      this.router.navigateByUrl('');
    }
  }

  constructor(private router: Router) {}

  ngOnInit() {
    this.page = PagesEnum.Loggin;
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
          this.page = PagesEnum.DeliverersList;
          break;
        case PagesEnum.Loggin:
          this.page = PagesEnum.Loggin;
          break;
      }
    }
  }
}
