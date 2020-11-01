import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PagesEnum } from 'src/app/enums/pages.enum';

@Component({
  selector: 'app-deliverers-list',
  templateUrl: './deliverers-list.component.html',
  styleUrls: ['./deliverers-list.component.scss']
})
export class DeliverersListComponent implements OnInit {
  @Output() menuInitEvent: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    let currentUrl = location.pathname;
    this.menuInitEvent.emit(currentUrl);
  }

}
