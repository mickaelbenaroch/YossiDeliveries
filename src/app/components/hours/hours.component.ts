import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/services/user-service.service';
import { HourModel} from '../../models/hourModel';

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

  constructor(private calendar: NgbCalendar, private userService: UserServiceService) {
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
      let date = new Date();
      date.setDate(this.date.day);
      date.setMonth(this.date.month);
      date.setFullYear(this.date.year);
      this.hourModel.dayOfWeek = date.getDay();
      this.userService.SendHour(this.hourModel);
    }
  }
  dateOutput(event: any) {
    this.date.day = event.day;
  }
}
