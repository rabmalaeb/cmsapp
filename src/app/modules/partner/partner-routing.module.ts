import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PartnersComponent } from './partners/partners.component';
import { PartnerComponent } from './partner/partner.component';
import { PartnerAddComponent } from './partner-add/partner-add.component';
import { ViewPartnerGuard } from './guards/view-partner.guard';
import { EditPartnerGuard } from './guards/edit-partner.guard';
import { AddPartnerGuard } from './guards/add-partner.guard';

const routes: Routes = [
  {
    path: 'partners',
    component: PartnersComponent,
    canActivate: [ViewPartnerGuard]
  },
  { path: 'partner/:id', component: PartnerComponent },
  {
    path: 'partners/:id/view',
    component: PartnerAddComponent,
    canActivate: [EditPartnerGuard]
  },
  {
    path: 'partners/add',
    component: PartnerAddComponent,
    canActivate: [AddPartnerGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class PartnerRoutingModule {}
