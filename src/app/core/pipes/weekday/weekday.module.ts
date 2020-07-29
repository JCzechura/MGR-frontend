import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WeekdayPipe} from "./weekday.pipe";



@NgModule({
  declarations: [WeekdayPipe],
  imports: [
    CommonModule
  ],
  exports: [WeekdayPipe],
  providers: [WeekdayPipe]
})
export class WeekdayModule { }
