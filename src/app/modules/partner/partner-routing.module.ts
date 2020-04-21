import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PartnersComponent } from './partners/partners.component';
import { PartnerAddComponent } from './partner-add/partner-add.component';
import { ViewPartnerGuard } from './guards/view-partner.guard';
import { EditPartnerGuard } from './guards/edit-partner.guard';
import { AddPartnerGuard } from './guards/add-partner.guard';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'partners',
    component: PartnersComponent,
    canActivate: [ViewPartnerGuard, AuthenticationGuard]
  },
  {
    path: 'partners/:id/view',
    component: PartnerAddComponent,
    canActivate: [EditPartnerGuard, AuthenticationGuard]
  },
  {
    path: 'partners/add',
    component: PartnerAddComponent,
    canActivate: [AddPartnerGuard, AuthenticationGuard]
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
