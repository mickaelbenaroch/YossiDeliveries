import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ModalTypeEnum } from 'src/app/enums/modal-type.enum';
import { PagesEnum } from 'src/app/enums/pages.enum';
import { ModalModel } from 'src/app/models/modalModel';
import { UserServiceService } from 'src/app/services/user-service.service';
import { HourModel} from '../../models/hourModel';
import { GenericModalComponent } from '../modal/generic-modal/generic-modal.component';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit {

  model: NgbDateStruct;
  date: {year: number, month: number, day: number};
  start = {hour: 17, minute: 0};
  end = {hour: 23, minute: 30};
  public result: string;
  public day: string;
  public hourModel: HourModel;
  private modalMod: ModalModel;
  @Output() DeliverersListEvent: EventEmitter<PagesEnum> = new EventEmitter();


  constructor(private calendar: NgbCalendar, private userService: UserServiceService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.result = ' 0 שעות'
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  calculate() {
    this.day = this.model.day + '/' + this.model.month + '/' + this.model.year;
    this.result = (Math.abs(this.start.hour - this.end.hour)) + ' שעות ' + ' , ' +  (Math.abs(this.start.minute - this.end.minute)) + ' דקות ';
  }

  Validate() {
    if (this.day && this.result && this.date && this.model && this.start && this.end) {
      this.hourModel = new HourModel();
      this.hourModel.day = this.model.day;
      this.hourModel.month = this.model.month;
      this.hourModel.year = this.model.year;
      this.hourModel.startHour = this.start.hour + ':' + this.start.minute;
      this.hourModel.endHour = this.end.hour + ':' + this.end.minute;
      this.hourModel.userEmail = this.userService.currentUser.email;
      this.hourModel.userPhone = this.userService.currentUser.phone;
      this.hourModel.total = (Math.abs(this.start.hour - this.end.hour)) + ':' + (Math.abs(this.start.minute - this.end.minute));
      this.hourModel.money = ((Math.abs(this.start.hour - this.end.hour)) * this.userService.currentUser.salaryPerHour) + ((Math.abs(this.start.minute - this.end.minute)) / 60 * this.userService.currentUser.salaryPerHour);
      let date = new Date();
      date.setDate(this.date.day);
      date.setMonth(this.date.month);
      date.setFullYear(this.date.year);
      this.hourModel.dayOfWeek = date.getDay();
      this.openConfimationPopup();
    }
  }
  dateOutput(event: any) {
    this.date.day = event.day;
  }

  openConfimationPopup() {
    this.modalMod = new ModalModel();
    this.modalMod.title = "האם ברצונך להמשיך הדיווח?";
    this.modalMod.displayBody = false;
    this.modalMod.displayTitle = true;
    this.modalMod.displayButton = true;
    this.modalMod.buttonText = "אישור";
    this.modalMod.type = ModalTypeEnum.warning;

    const dialogRef = this.dialog.open(GenericModalComponent, {
      panelClass: 'hours-confirmation',
      height: '120px',
      data: {modalModel: this.modalMod}
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.userService.SendHour(this.hourModel);
        this.DeliverersListEvent.emit(PagesEnum.DeliverersList);
      }
    });
  }
}
