import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  public isUserLoggedIn: boolean = false;
  
  constructor() { }
}
