import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from 'src/app/services/user-service.service';
import { PagesEnum } from 'src/app/enums/pages.enum';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader'; 
import { BehaviorSubject, Observable } from 'rxjs';


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
  @Output() loggedInEvent: EventEmitter<PagesEnum> = new EventEmitter();
  


  constructor(private httpService: HttpClient, 
              private router: Router, 
              private ngxUiLoaderService: NgxUiLoaderService,
              public userService: UserServiceService ) {  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
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
    this.ngxUiLoaderService.start(); 
    this.httpService.post(this.userService.baseUrl + 'login', user).subscribe(
      (res: any) => {
        if(res && res.data) {
            console.log(res.data);        
            this.loggedInEvent.emit(PagesEnum.DeliverersList);
            this.ngxUiLoaderService.stop();
            this.userService.currentUser = res.data;
            this.router.navigateByUrl('list');
        } else {
          this.ngxUiLoaderService.stop();
          this.passwordError = true;
          this.emailError = true;
        }
      },
      err => {
        this.ngxUiLoaderService.stop();
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
