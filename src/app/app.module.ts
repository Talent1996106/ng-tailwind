import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgtContentModule,
  NgtHeaderNavModule,
  NgtInputModule,
  NgtSectionModule,
  NgtSidenavModule,
  NgtStylizableModule,
  NgtPortletModule,
  NgtButtonModule,
} from 'ng-tailwind';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgtSectionModule,
    NgtInputModule,
    NgtHeaderNavModule,
    NgtSidenavModule,
    NgtContentModule,
    NgtStylizableModule,
    NgtPortletModule,
    NgtButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
