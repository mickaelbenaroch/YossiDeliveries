import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from 'src/app/services/user-service.service';
import { PagesEnum } from 'src/app/enums/pages.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{

  public emailError: boolean = false;
  public passwordError: boolean = false;
  public password: string;
  public email: string;
  private baseUrl: string = "https://yoss-deliv-api.herokuapp.com/";
  //private baseUrl: string = "http://localhost:3030/";
  @Output() loggedInEvent: EventEmitter<PagesEnum> = new EventEmitter();

  constructor(private httpService: HttpClient, private userService: UserServiceService, private router: Router) {  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.userService.isUserLoggedIn = false;
  }

  Enter() {
    this.emailError = false;
    this.passwordError = false;
    console.log("email: " + this.email);
    console.log("password: " + this.password);
    if (!this.email || !this.ValidateEmail(this.email)) {
      this.emailError = true;
    }
    if (!this.password) {
      this.passwordError = true;
    }

    let user = {
      email: this.email,
      pass: this.password
    }
    this.httpService.post(this.baseUrl + 'login', user).subscribe(
      (res: any) => {
        if(res && res.data) {
            console.log(res.data);
            this.userService.isUserLoggedIn = true;
            this.loggedInEvent.emit(PagesEnum.DeliverersList);
            this.router.navigateByUrl('list');
        } else {
          this.passwordError = true;
          this.emailError = true;
        }
      },
      err => {
        this.passwordError = true;
        this.emailError = true;
        console.log(err);
      }
    )
  }

  ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
      }
      return (false)
  }
}
