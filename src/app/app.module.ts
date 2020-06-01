import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material'
import {CustomMaterialModule} from './core/material.module';
import {HttpClientModule} from '@angular/common/http';

import {appRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {UserAsDriverComponent} from './user-as-driver/user-as-driver.component';
import {UserAsDispatcherComponent} from './user-as-dispatcher/user-as-dispatcher.component';

import {NeedAuthGuardDispatcher} from './need-auth-guard-dispatcher';
import {NeedAuthGuardDriver} from './need-auth-guard-driver';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {JwtModule} from "@auth0/angular-jwt";
import {jwtConfig} from "../environments/jwt-config";
import {tokenGetter} from "./token-getter";

@NgModule({
    imports: [
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
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        UserAsDriverComponent,
        UserAsDispatcherComponent
    ],
    providers: [
        NeedAuthGuardDispatcher,
        NeedAuthGuardDriver
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
