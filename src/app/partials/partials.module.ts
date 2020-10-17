import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../shared/components/components.module';
import { NavGroupComponent } from './nav-group/nav-group.component';

@NgModule({
  declarations: [
    NavBarComponent,
    NavGroupComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
  ],
  exports: [
    NavBarComponent,
    NavGroupComponent,
    FooterComponent,
    HeaderComponent,
  ],
})
export class PartialsModule {}
