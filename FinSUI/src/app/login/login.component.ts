import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MESSAGES } from '../shared/constants/messages.constant';
import { AuthService } from '../shared/services/core/auth/auth-service.service';
import { LoginService } from '../shared/services/core/login/login.service';
import { MyserviceService } from './../myservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MyserviceService]
})
export class LoginComponent {
  readonly msgConst = MESSAGES;
  isLoginError: boolean;
  subscription: Subscription;
  constructor(private service: MyserviceService, private routes: Router, private authService: AuthService,
    private loginService: LoginService)
   { }

  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  login(uname: string, password: string) {
    if (!uname || !password) {
      return;
    }
    this.isLoginError = false;
    this.subscription = this.loginService.login(uname, password).subscribe((res: any) => {
      this.authService.setAuthToken(res.aceess_key);
      this.routes.navigate(['/starter']);
    }, (error: any) => {
      this.isLoginError = true;
    })
  }
}