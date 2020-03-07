import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersComponent } from './partners/partners.component';
import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerAddComponent } from './partner-add/partner-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PartnerFormComponent } from './partner-form/partner-form.component';
import { PartnerFiltersComponent } from './partner-filters/partner-filters.component';

@NgModule({
  declarations: [PartnersComponent, PartnerAddComponent, PartnerFormComponent, PartnerFiltersComponent],
  imports: [CommonModule, PartnerRoutingModule, ComponentsModule, SharedModule]
})
export class PartnerModule {}
