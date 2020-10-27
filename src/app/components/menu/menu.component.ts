import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  constructor(public userService: UserServiceService) { }

  ngOnInit(): void {
  }

  Login() {
    
  }

  MenuItemClicked(action : string) {
    switch(action) {
      case 'list':
        this.DeliverersListEvent.emit(PagesEnum.DeliverersList);
      break;
    }
  }
}
