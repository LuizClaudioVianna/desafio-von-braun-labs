import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICommand, IDevice } from '../../resources/interfaces/device.interface';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-details',
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './device-details.component.html',
  styleUrl: './device-details.component.scss'
})
export class DeviceDetailsComponent {
  detail: IDevice | null = null;
  @Input() command: ICommand | undefined;

  constructor(private router: Router) {
    // Forçar a navegação se o estado estiver vazio (acesso direto à rota)
    if (this.router.getCurrentNavigation()?.extras?.state?.['item']) {
      this.detail = this.router.getCurrentNavigation()?.extras?.state?.['item'] as any;
    } else {
      // Redirecionar para a lista ou exibir uma mensagem de erro
      this.router.navigate(['/devices-list']);
    }
  }

  doExecutaCommand(command: ICommand) {
    this.router.navigate(['/device-execution'], { state: { item: command } });
  }

  getFormatValue(command: ICommand) {
    if (command?.format?.properties?.temperatura?.format) {
      return command.format.properties.temperatura.format;
    } else if (command?.format?.properties?.unidade?.type) {
      return command.format.properties.unidade.type;
    } else if (command?.format?.properties?.mensagem) {
      return command.format.properties.mensagem.type;
    } else if (command?.format?.properties?.novo_intervalo) {
      return command.format.properties.novo_intervalo.type;
    } else if (command?.format?.properties?.rgb) {
      return command.format.properties.rgb.type;
    } else if (command?.format?.properties?.status) {
      return command.format.properties.status.type;
    }
    else {
      return 'N/A';
    }
  }
}
