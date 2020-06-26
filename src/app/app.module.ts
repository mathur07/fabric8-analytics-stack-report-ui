import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Broadcaster } from 'ngx-base';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';


// Imports stackdetailsmodule
import { StackDetailsModule } from './stack/stack-details/stack-details.module';
import { BannerComponent } from './banner/banner.component'
@NgModule({
  imports: [
    BrowserModule,
    StackDetailsModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [AppComponent, BannerComponent],
  providers: [
    Broadcaster
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
