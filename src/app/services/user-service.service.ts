import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {UserModel} from '../models/userModel';
import {GenericModalComponent} from '../components/modal/generic-modal/generic-modal.component';
import { ModalModel } from '../models/modalModel';
import { ModalTypeEnum } from '../enums/modal-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public isUserLoggedIn: boolean = false;
  public currentUser: UserModel;
  public baseUrl: string = "https://yoss-deliv-api.herokuapp.com/";
  //private baseUrl: string = "http://localhost:3030/";
  private modalMod: ModalModel;
  public deliverers: UserModel[] = [];

  constructor(private httpService: HttpClient, private ngxService: NgxUiLoaderService, public dialog: MatDialog) { }

  createUser(user: UserModel) {
    this.ngxService.start();
    this.httpService.post(this.baseUrl + 'login/newuser', user).subscribe(
      res => {
        this.successProcess("השליח נוצר בהצלחה");
      }, err => {
        this.errorProcess(err);
      }
    )
  }

  getDeliverersList() {
    this.ngxService.start();
    this.httpService.get(this.baseUrl + 'deliverers/list').subscribe(
      (res: any) => {
        if (res && (res.data as UserModel[])) {
          this.deliverers = res.data;
          this.ngxService.stop();
        } else {
          this.errorProcess("משהו השתבש בדרך ...");
        }
      },
      err =>{
        this.errorProcess(err);
      }
    )
  }

  errorProcess(err: any) {
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

  successProcess(mess: any) {
    this.ngxService.stop();
        this.modalMod = new ModalModel();
        this.modalMod.title = mess;
        this.modalMod.displayBody = false;
        this.modalMod.displayTitle = true;
        this.modalMod.displayButton = false;
        this.modalMod.type = ModalTypeEnum.success;

        const dialogRef = this.dialog.open(GenericModalComponent, {
          data: {modalModel: this.modalMod}
        });
  }
}
