import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RequestLogin } from '../../resources/models/request-login';
import { LoginService } from '../../resources/services/login.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CardModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  requestLogin: any = {};

  constructor(private loginService: LoginService) { }

  doLogin(): void {
    this.loginService.doLogin(this.requestLogin).subscribe(data => {
      console.log(data);
    },
      error => {
        console.error(error)
      })
  }

}
