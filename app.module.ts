import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EnregistrementComponent } from './enregistrement/enregistrement.component';
import { BilanComponent } from './bilan/bilan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { dash, NgxBootstrapIconsModule, pen, pencil, x } from 'ngx-bootstrap-icons';
import { trash3 } from 'ngx-bootstrap-icons';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPrintModule } from 'ngx-print';

const icons = {
  pen,
  trash3,
  pencil,
  x,
  dash
}

@NgModule({
  declarations: [
    AppComponent,
    EnregistrementComponent,
    BilanComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPrintModule,
    AppRoutingModule,
    NgxBootstrapIconsModule.pick(icons,{
      width: '25px',
      height: '2em',}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
