import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PagesEnum } from 'src/app/enums/pages.enum';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public pageenum: PagesEnum;
  @Output() DeliverersListEvent: EventEmitter<PagesEnum> = new EventEmitter();
  constructor(public userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  Login() {
  }

  MenuItemClicked(action : string) {
    switch(action) {
      case 'list':
        this.DeliverersListEvent.emit(PagesEnum.DeliverersList);
        this.router.navigateByUrl('list');
      break;
      case 'add':
        this.DeliverersListEvent.emit(PagesEnum.AddDeliver);
        this.router.navigateByUrl('adduser');
      break;
      case 'hours':
        this.DeliverersListEvent.emit(PagesEnum.DeliverersHours);
        this.router.navigateByUrl('hours');
      break;
    }
  }
}
