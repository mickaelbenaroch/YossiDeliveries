import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PagesEnum } from 'src/app/enums/pages.enum';
import { UserModel } from 'src/app/models/userModel';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-deliverers-list',
  templateUrl: './deliverers-list.component.html',
  styleUrls: ['./deliverers-list.component.scss']
})
export class DeliverersListComponent implements OnInit {
  @Output() menuInitEvent: EventEmitter<string> = new EventEmitter();
  constructor(public userService: UserServiceService) { }

  ngOnInit(): void {
    this.userService.getDeliverersList();
    let currentUrl = location.pathname;
    this.menuInitEvent.emit(currentUrl);
  }

}
