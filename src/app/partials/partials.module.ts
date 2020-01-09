import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [
    NavBarComponent,
    NavItemComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [CommonModule, BrowserModule, RouterModule, SharedModule],
  exports: [NavBarComponent, NavItemComponent, FooterComponent, HeaderComponent]
})
export class PartialsModule {}
