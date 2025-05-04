import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public success(message: string) {
    this.ShowAlert('Sucesso', message, 'success');
  }

  public info(message: string, title?: string) {
    this.ShowAlert('Informação', message, 'info');
  }

  public error(message: string, title?: string) {
    this.ShowAlert(`Erro ${title}`, message, 'error');
  }

  private ShowAlert(
    title: string,
    message: string,
    icon: SweetAlertIcon) {
    Swal.fire(title, message, icon);
  }
}
