import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DevicesListComponent } from './pages/devices-list/devices-list.component';
import { AuthGuardService } from './resources/services/auth-guard.service';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: 'devices-list',
        //canActivate: [AuthGuardService],
        component: DevicesListComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
