import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ViewManufacturerGuard } from './guards/view-manufacturer.guard';
import { EditManufacturerGuard } from './guards/edit-manufacturer.guard';
import { AddManufacturerGuard } from './guards/add-manufacturer.guard';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';
import { ManufacturersComponent } from './manufacturers/manufacturers.component';
import { ManufacturerAddComponent } from './manufacturer-add/manufacturer-add.component';

const routes: Routes = [
  {
    path: 'manufacturers',
    component: ManufacturersComponent,
    canActivate: [ViewManufacturerGuard, AuthenticationGuard]
  },
  {
    path: 'manufacturers/:id/view',
    component: ManufacturerAddComponent,
    canActivate: [EditManufacturerGuard, AuthenticationGuard]
  },
  {
    path: 'manufacturers/add',
    component: ManufacturerAddComponent,
    canActivate: [AddManufacturerGuard, AuthenticationGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})
  ],
  exports: [RouterModule]
})
export class ManufacturerRoutingModule {}
