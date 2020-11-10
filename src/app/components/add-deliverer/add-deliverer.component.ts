import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/userModel';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-add-deliverer',
  templateUrl: './add-deliverer.component.html',
  styleUrls: ['./add-deliverer.component.scss']
})
export class AddDelivererComponent implements OnInit {

  public userModel: UserModel = new UserModel();
  public firstNameError: boolean;
  public lastNameError: boolean;
  public emailError: boolean;
  public phoneError: boolean;
  public priceError: boolean;
  public passError: boolean;
  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.userModel.isAdmin = false;
  }

  AddUser() {
    this.resetErrors();
    if (this.checkModel()) {
      this.userService.createUser(this.userModel);
    } else {
      return;
    }
  }

  resetErrors() {
    if (this.firstNameError) {
      this.firstNameError = false;
    }
    if (this.lastNameError) {
      this.lastNameError = false;
    }
    if (this.emailError) {
      this.emailError = false;
    }
    if (this.phoneError) {
      this.phoneError = false;
    }
    if (this.priceError) {
      this.priceError = false;
    }
    if (this.passError) {
      this.passError = false;
    }
  }

  checkModel() : boolean {
    if (!this.userModel) {
    }
    if (!this.userModel.firstname) {
      this.firstNameError = true;
    }
    if (!this.userModel.lastname) {
      this.lastNameError = true;
    }
    if (!this.userModel.email || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.userModel.email))) {
      this.emailError = true;
    }
    if (!this.userModel.phone || this.userModel.phone.length !== 10) {
      this.phoneError = true;
    }
    if (!this.userModel.salaryPerHour) {
      this.priceError = true;
    }
    if (!this.userModel.pass || this.userModel.pass.length < 6) {
      this.passError = true;
    } 
    if (this.firstNameError || this.lastNameError || this.emailError || this.phoneError || this.priceError || this.passError) {
      return false
    } else {
      return true;
    }
  }
}
