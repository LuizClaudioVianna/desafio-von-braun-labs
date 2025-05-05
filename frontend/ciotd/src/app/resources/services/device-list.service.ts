import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { IDevice } from '../interfaces/device.interface';

@Injectable({
  providedIn: 'root'
})
export class DeviceListService {

  private readonly API = 'https://localhost:7067/api/Devices';

  private readonly _httpClient = inject(HttpClient);
  token = localStorage.getItem('access-token');
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  list(): Observable<IDevice[]> {

    return this._httpClient.get<IDevice[]>(this.API, { headers: this.headers })
      .pipe(
        first(),
      );
  }
}