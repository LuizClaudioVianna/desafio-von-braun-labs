import { Component, OnInit } from '@angular/core';

import { TableModule, Table } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { IDevice } from '../../resources/interfaces/device.interface';
import { DeviceListService } from '../../resources/services/device-list.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-devices-list',
  imports: [TableModule, CardModule, IconFieldModule, InputIconModule, ButtonModule],
  templateUrl: './devices-list.component.html',
  styleUrl: './devices-list.component.scss'
})
export class DevicesListComponent implements OnInit {

  devices!: IDevice[];
  loading: boolean = true;

  constructor(private deviceListService: DeviceListService, private router: Router) { }

  ngOnInit(): void {
    this.loading = false;
    this.deviceListService.list().subscribe((data) => {
      this.devices = data
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

  doDeviceDetails(device: IDevice) {
    this.router.navigate(['/device-details'], { state: { item: device } });
  }
}
