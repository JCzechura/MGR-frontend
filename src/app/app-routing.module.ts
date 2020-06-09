import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from "./core/route-guards/auth.guard";
import {NonAuthGuard} from "./core/route-guards/non-auth.guard";

const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [NonAuthGuard]},
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '**', redirectTo: '/login'},
];

export const appRoutingModule = RouterModule.forRoot(routes);
