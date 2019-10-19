import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material'
import { CustomMaterialModule } from './core/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserAsDriverComponent } from './user-as-driver/user-as-driver.component';
import { UserAsDispatcherComponent } from './user-as-dispatcher/user-as-dispatcher.component';

import { NeedAuthGuardDispatcher } from './need-auth-guard-dispatcher';
import { NeedAuthGuardDriver } from './need-auth-guard-driver';

@NgModule({
imports: [
ReactiveFormsModule,
BrowserModule,
FormsModule,
appRoutingModule,
BrowserAnimationsModule,
CustomMaterialModule,
MatProgressBarModule,
HttpClientModule
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
