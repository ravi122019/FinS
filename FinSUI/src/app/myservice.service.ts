import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class MyserviceService {

  constructor(private routes: Router) { }

  checkusernameandpassword(uname: string, pwd: string) {
    if (uname === 'admin' && pwd === 'admin123') {
      localStorage.setItem('username', 'admin');
      return true;
    } else {
      return false;
    }
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('authToken');
    this.routes.navigate(['/login']);
	}
}
