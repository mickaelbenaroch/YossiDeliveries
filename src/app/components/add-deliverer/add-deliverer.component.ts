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
  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
  }

  AddUser() {
    this.userService.createUser(this.userModel);
  }
}
