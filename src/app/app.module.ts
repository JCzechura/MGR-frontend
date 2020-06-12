import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material'
import {CustomMaterialModule} from './core/material.module';
import {HttpClientModule} from '@angular/common/http';

import {appRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {JwtModule} from "@auth0/angular-jwt";
import {jwtConfig} from "../environments/jwt-config";
import {tokenGetter} from "./core/authorization/token-getter";
import {AuthGuard} from "./core/route-guards/auth.guard";
import {NonAuthGuard} from "./core/route-guards/non-auth.guard";
import {TitleToolbarModule} from "./ui/title-toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS_PROVIDER} from "./core/snack-bar/mat-snack-bar-default-options.provider";

@NgModule({
    imports: [
        TitleToolbarModule,
        ReactiveFormsModule,
        BrowserModule,
        FormsModule,
        appRoutingModule,
        BrowserAnimationsModule,
        CustomMaterialModule,
        MatProgressBarModule,
        HttpClientModule,
        MatSnackBarModule,
        JwtModule.forRoot({
            config: {
                tokenGetter,
                headerName: 'Authorization',
                authScheme: '',
                whitelistedDomains: jwtConfig.whitelistedDomains,
                blacklistedRoutes: jwtConfig.blacklistedRoutes,
                skipWhenExpired: true,
            }
        }),
        MatTabsModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    providers: [
        MAT_SNACK_BAR_DEFAULT_OPTIONS_PROVIDER,
        AuthGuard,
        NonAuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
