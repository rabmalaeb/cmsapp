import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './banners/banners.component';
import { BannerRoutingModule } from './banner-routing.module';
import { BannerAddComponent } from './banner-add/banner-add.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { BannerFormComponent } from './banner-form/banner-form.component';

@NgModule({
  declarations: [BannersComponent, BannerAddComponent, BannerFormComponent],
  imports: [CommonModule, BannerRoutingModule, ComponentsModule, SharedModule]
})
export class BannerModule {}
