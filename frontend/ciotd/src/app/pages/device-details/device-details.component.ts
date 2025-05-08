import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule, Table } from 'primeng/table';

import { IDevice } from '../../resources/interfaces/device.interface';
import { ICommand } from '../../resources/interfaces/command.interface';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-device-details',
  imports: [CommonModule, CardModule, ButtonModule, TableModule, IconFieldModule, InputIconModule],
  templateUrl: './device-details.component.html',
  styleUrl: './device-details.component.scss'
})
export class DeviceDetailsComponent implements OnInit {

  loading: boolean = true;
  detail: IDevice | null = null;
  idDevice!: string | undefined;
  @Input() command: ICommand | undefined;

  constructor(private router: Router) {
    // Forçar a navegação se o estado estiver vazio (acesso direto à rota)
    if (this.router.getCurrentNavigation()?.extras?.state?.['item']) {
      this.detail = this.router.getCurrentNavigation()?.extras?.state?.['item'] as any;
      this.idDevice = this.detail?.id.toString();
    } else {
      // Redirecionar para a lista ou exibir uma mensagem de erro
      this.router.navigate(['/devices-list']);
    }
  }
  ngOnInit(): void {
    this.loading = false;
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

  doBack() {
    this.router.navigate(['devices-list']);
  }

  doExecutaCommand(idDevice: string | undefined, command: ICommand) {
    this.router.navigate(['/device-execution'], {
      state: {
        item: command,
        idDevice: idDevice
      }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length >= 3) {
      table.filterGlobal(filterValue, 'contains');
    } else if (filterValue.length === 0) {
      table.reset()
    }
  }

}
