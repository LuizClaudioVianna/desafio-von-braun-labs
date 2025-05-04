import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RequestLogin } from '../../resources/models/request-login';
import { LoginService } from '../../resources/services/login.service';
import { AlertService } from '../../resources/services/alert.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CardModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  requestLogin: any = {};
  statusString: string = "";
  messageTitle: string = "";

  constructor(private loginService: LoginService, private alertService: AlertService, private router: Router) { }

  doLogin(): void {
    this.loginService.doLogin(this.requestLogin).subscribe(data => {
      this.router.navigate(['dashboard']);
    },
      (httpError) => {
        this.statusString = httpError.status.toString();
        this.messageTitle = httpError.error.title;
        this.alertService.error(this.messageTitle, this.statusString)
      })
  }

}
