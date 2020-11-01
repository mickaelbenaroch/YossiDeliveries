import { Injectable } from '@angular/core';
import {UserModel} from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public isUserLoggedIn: boolean = false;
  public cuurentUser: UserModel;
  constructor() { }

}
