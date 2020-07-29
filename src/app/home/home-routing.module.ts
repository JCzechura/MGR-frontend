import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../core/route-guards/auth.guard';
import {HomeComponent} from "./home/home.component";
import {UserInfoComponent} from "./home/user-info/user-info.component";
import {GarbageTruckRoutesComponent} from "./home/garbage-truck-routes/garbage-truck-routes/garbage-truck-routes.component";
import {DataBaseComponent} from "./home/data-base/data-base/data-base.component";
import {CurrentRouteComponent} from "./home/current-route/current-route.component";
import {PlansComponent} from "./home/plans/plans.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {path: 'user', component: UserInfoComponent, canActivate: [AuthGuard]},
            {path: 'routes', component: GarbageTruckRoutesComponent, canActivate: [AuthGuard]},
            {path: 'database', component: DataBaseComponent,  canActivate: [AuthGuard]},
            {path: 'current_route', component: CurrentRouteComponent, canActivate: [AuthGuard]},
            {path: 'plans', component: PlansComponent,  canActivate: [AuthGuard]},
            {path: '', pathMatch: 'full', component: UserInfoComponent, canActivate: [AuthGuard]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}