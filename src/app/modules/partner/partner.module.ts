import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersComponent } from './partners/partners.component';
import { PartnerComponent } from './partner/partner.component';
import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerAddComponent } from './partner-add/partner-add.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [PartnersComponent, PartnerComponent, PartnerAddComponent],
  imports: [CommonModule, PartnerRoutingModule, ComponentsModule, SharedModule]
})
export class PartnerModule {}
