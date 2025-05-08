import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ICommand } from '../../resources/interfaces/command.interface';
import { Parameter } from '../../resources/interfaces/parameter.interface';
import { ComunicationTelnetService } from '../../resources/services/comunication-telnet.service';
import { AlertService } from '../../resources/services/alert.service';

@Component({
  selector: 'app-device-execution',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, CardModule, InputTextModule],
  templateUrl: './device-execution.component.html',
  styleUrls: ['./device-execution.component.scss'],
})
export class DeviceExecutionComponent {

  @Input() idDevice: string | null = null;
  @Input() command: ICommand | null = null;
  selectedCommandIndex: number | null = null;
  parameter: Parameter = { name: '', description: '', type: '' };
  statusString: string = "";
  messageTitle: string = "";

  constructor(private router: Router,
    private comunicationTelnetService: ComunicationTelnetService,
    private alertService: AlertService) {

    if (this.router.getCurrentNavigation()?.extras?.state?.['item'] && this.router.getCurrentNavigation()?.extras?.state?.['idDevice']) {
      this.idDevice = this.router.getCurrentNavigation()?.extras?.state?.['idDevice'] as string;
      this.command = this.router.getCurrentNavigation()?.extras?.state?.['item'] as any;
    } else {

      this.router.navigate(['/device-details']);
    }
  }

  montarStringEnvio(comando: string, parametros: Parameter): string {
    const valoresParametros: string[] = [];

    // Itera sobre as propriedades do objeto 'parametros'
    for (const key in parametros) {
      if (parametros.hasOwnProperty(key)) {
        const value = parametros[key];
        // Adiciona o valor ao array de valores (certificando-se de que é uma string)
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          valoresParametros.push(String(value));
        }
      }
    }

    // Junta o comando com os valores dos parâmetros, separando por \b
    const elementos = [comando, ...valoresParametros];
    const stringComBarraB = elementos.join('\b');

    // Adiciona o terminador de fim de linha \r
    const stringFinalizada = `${stringComBarraB}\r`;

    return stringFinalizada;
  }

  doBack() {
    this.router.navigate(['devices-list']);
  }

  doSendParams() {
    let stringEnvioMontada = this.montarStringEnvio(`${this.idDevice}.${this.command?.command.command}`, this.parameter);
    this.comunicationTelnetService.doAComunicationTelnet(stringEnvioMontada).subscribe(data => {
      this.messageTitle = data.token.replaceAll('\b', '\\b').replace('\r', '\\r');
      this.alertService.success(this.messageTitle)
    },
      (httpError) => {
        this.messageTitle = httpError.name;
        this.alertService.error(this.messageTitle, this.statusString)
      });
  }
}