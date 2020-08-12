import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserInfoComponent} from "./home/user-info/user-info.component";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home/home.component";
import {TitleToolbarModule} from "../ui/title-toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {CurrentRouteComponent} from './home/current-route/current-route.component';
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {PasswordChangeDialogComponent} from './home/user-info/password-change-dialog/password-change-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {DataBaseModule} from "./home/data-base/data-base.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {GarbageTruckRoutesModule} from "./home/garbage-truck-routes/garbage-truck-routes.module";
import {PlansComponent} from "./home/plans/plans/plans.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {WeekdayModule} from "../core/pipes/weekday/weekday.module";
import { PlansConfirmDialogComponent } from './home/plans/plans-confirm-dialog/plans-confirm-dialog.component';


@NgModule({
    declarations: [
        UserInfoComponent,
        HomeComponent,
        CurrentRouteComponent,
        PlansComponent,
        PasswordChangeDialogComponent,
        PlansConfirmDialogComponent
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
        MatButtonModule,
        MatDialogModule,
        DataBaseModule,
        MatTooltipModule,
        GarbageTruckRoutesModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        WeekdayModule
    ],
    entryComponents: [
        PasswordChangeDialogComponent,
        PlansConfirmDialogComponent
    ]
})
export class HomeModule {
}
