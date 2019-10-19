import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserAsDriverComponent } from './user-as-driver/user-as-driver.component';
import { UserAsDispatcherComponent } from './user-as-dispatcher/user-as-dispatcher.component';
import { NeedAuthGuardDispatcher } from './need-auth-guard-dispatcher';
import { NeedAuthGuardDriver } from './need-auth-guard-driver';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'driver', component: UserAsDriverComponent, canActivate: [NeedAuthGuardDriver] },
    { path: 'dispatcher', component: UserAsDispatcherComponent, canActivate: [NeedAuthGuardDispatcher] }
];

export const appRoutingModule = RouterModule.forRoot(routes);
