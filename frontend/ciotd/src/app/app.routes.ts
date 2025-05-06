import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DevicesListComponent } from './pages/devices-list/devices-list.component';
import { AuthGuardService } from './resources/services/auth-guard.service';
import { DeviceDetailsComponent } from './pages/device-details/device-details.component';
import { DeviceExecutionComponent } from './pages/device-execution/device-execution.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: 'devices-list',
        canActivate: [AuthGuardService],
        component: DevicesListComponent
    },
    {
        path: 'device-details',
        canActivate: [AuthGuardService],
        component: DeviceDetailsComponent
    },
    {
        path: 'device-execution',
        //canActivate: [AuthGuardService],
        component: DeviceExecutionComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
