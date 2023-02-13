import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [FooterComponent, NavbarComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [FooterComponent, NavbarComponent]
})
export class SharedModule { }
