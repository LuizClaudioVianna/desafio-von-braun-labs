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
  @Input() command: ICommand | null = null;
  selectedCommandIndex: number | null = null;
  parameter: Parameter = { name: '', description: '', type: '' };
  statusString: string = "";
  messageTitle: string = "";

  constructor(private router: Router,
    private comunicationTelnet: ComunicationTelnetService,
    private alertService: AlertService) {
    
    if (this.router.getCurrentNavigation()?.extras?.state?.['item']) {
      this.command = this.router.getCurrentNavigation()?.extras?.state?.['item'] as any;
    } else {
    
      this.router.navigate(['/device-details']);
    }
  }

  doSendParams() {
    this.comunicationTelnet.doAComunicationTelnet(this.parameter).subscribe(data => {
      this.messageTitle = data.token;
      this.alertService.success(this.messageTitle)
      console.log(data);
    },
      (httpError) => {
        this.messageTitle = httpError.name;
        this.alertService.error(this.messageTitle, this.statusString)
      });
  }
}