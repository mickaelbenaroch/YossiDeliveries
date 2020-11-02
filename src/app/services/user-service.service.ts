import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {UserModel} from '../models/userModel';
import {GenericModalComponent} from '../components/modal/generic-modal/generic-modal.component';
import { ModalModel } from '../models/modalModel';
import { ModalTypeEnum } from '../enums/modal-type.enum';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public isUserLoggedIn: boolean = false;
  public currentUser: UserModel;
  public baseUrl: string = "https://yoss-deliv-api.herokuapp.com/";
  //private baseUrl: string = "http://localhost:3030/";
  private modalMod: ModalModel;

  constructor(private httpService: HttpClient, private ngxService: NgxUiLoaderService, public dialog: MatDialog) { }

  createUser(user: UserModel) {
    this.ngxService.start();
    this.httpService.post(this.baseUrl + 'login/newuser', user).subscribe(
      res => {
        this.ngxService.stop();
        this.modalMod = new ModalModel();
        this.modalMod.title = "השליח נוצר בהצלחה";
        this.modalMod.displayBody = false;
        this.modalMod.displayTitle = true;
        this.modalMod.displayButton = false;
        this.modalMod.type = ModalTypeEnum.success;

        const dialogRef = this.dialog.open(GenericModalComponent, {
          data: {modalModel: this.modalMod}
        });
      }, err => {
        this.ngxService.stop();
        this.modalMod = new ModalModel();
        this.modalMod.title = "משהו השתבש בדרך ...";
        this.modalMod.displayBody = true;
        this.modalMod.displayTitle = true;
        this.modalMod.displayButton = false;
        this.modalMod.type = ModalTypeEnum.error;
        this.modalMod.body = err;

        const dialogRef = this.dialog.open(GenericModalComponent, {
          panelClass: 'generic-error-class',
          data: {modalModel: this.modalMod}
        });
      }
    )
  }
}
