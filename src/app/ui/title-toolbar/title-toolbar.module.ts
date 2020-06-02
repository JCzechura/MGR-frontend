import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TitleToolbarComponent} from './title-toolbar/title-toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    TitleToolbarComponent
  ],
  exports: [
    TitleToolbarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatTooltipModule,
  ],
})
export class TitleToolbarModule {
}
