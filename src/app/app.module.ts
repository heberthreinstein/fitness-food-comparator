import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NbThemeModule, NbLayoutModule, NbAccordionModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    ProductsGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbAccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
