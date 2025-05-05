import { Component, OnInit } from '@angular/core';
import { ICommand } from '../../resources/interfaces/device.interface';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-execution',
  imports: [CardModule, ButtonModule, CommonModule],
  templateUrl: './device-execution.component.html',
  styleUrl: './device-execution.component.scss'
})
export class DeviceExecutionComponent implements OnInit {
  command: ICommand | null = null;

  constructor(private router: Router) {
    // Forçar a navegação se o estado estiver vazio (acesso direto à rota)
    if (this.router.getCurrentNavigation()?.extras?.state?.['item']) {
      this.command = this.router.getCurrentNavigation()?.extras?.state?.['item'] as any;
    } else {
      // Redirecionar para a lista ou exibir uma mensagem de erro
      this.router.navigate(['/device-details']);
    }
  }


  ngOnInit(): void {
    console.log('Item recebido via state:', this.command);
  }

}
