import { Component, OnInit } from '@angular/core';
import {PagesEnum} from './enums/pages.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'YossDeliveries';
  public page:PagesEnum;
  pageenum = PagesEnum;

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
