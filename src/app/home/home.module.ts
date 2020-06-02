import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserInfoComponent} from "./home/user-info/user-info.component";
import {GarbageTruckRoutesComponent} from "./home/garbage-truck-routes/garbage-truck-routes.component";
import {DataBaseComponent} from "./home/data-base/data-base.component";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home/home.component";
import {TitleToolbarModule} from "../ui/title-toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import { CurrentRouteComponent } from './home/current-route/current-route.component';
import { ReportComponent } from './home/report/report.component';
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
    declarations: [
        UserInfoComponent,
        GarbageTruckRoutesComponent,
        DataBaseComponent,
        HomeComponent,
        CurrentRouteComponent,
        ReportComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        TitleToolbarModule,
        MatTabsModule,
        MatListModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class HomeModule {
}
