import { Injectable } from '@angular/core';
import { RequestLogin } from '../models/request-login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../models/response-login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  public doLogin(requestLogin: RequestLogin): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>('https://localhost:7067/api/Auth/login', requestLogin);
  }
}
