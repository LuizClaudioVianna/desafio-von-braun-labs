import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ICommand } from '../../resources/interfaces/command.interface';
import { Parameter } from '../../resources/interfaces/parameter.interface';

@Component({
  selector: 'app-device-execution',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, CardModule, InputTextModule],
  templateUrl: './device-execution.component.html',
  styleUrls: ['./device-execution.component.scss'],
})
export class DeviceExecutionComponent implements OnInit {
  @Input() command: ICommand | null = null;
  selectedCommandIndex: number | null = null;
  parameter: Parameter = { name: '', description: '', type: '' };

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
    console.log('Item recebido via state:', this.command?.command);
  }

  doAddParams() {
    console.log(this.parameter);
  }
}