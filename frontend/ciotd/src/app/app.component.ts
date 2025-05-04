import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {ButtonModule} from 'primeng/button'
import { CardModule } from 'primeng/card';

import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule,CardModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Bem vindo ao CIotD - Community IoT Device';
}
