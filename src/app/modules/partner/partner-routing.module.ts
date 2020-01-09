import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PartnersComponent } from './partners/partners.component';
import { PartnerComponent } from './partner/partner.component';
import { PartnerAddComponent } from './partner-add/partner-add.component';


const routes: Routes = [
  { path: 'partners', component: PartnersComponent },
  { path: 'partner/:id', component: PartnerComponent },
  { path: 'partners/:id/view', component: PartnerAddComponent },
  { path: 'partners/add', component: PartnerAddComponent},
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

export class PartnerRoutingModule { }
