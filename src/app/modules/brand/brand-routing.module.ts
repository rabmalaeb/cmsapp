import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrandsComponent } from './brands/brands.component';
import { BrandAddComponent } from './brand-add/brand-add.component';
import { ViewBrandGuard } from './guards/view-brand.guard';
import { EditBrandGuard } from './guards/edit-brand.guard';
import { AddBrandGuard } from './guards/add-brand.guard';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'brands',
    component: BrandsComponent,
    canActivate: [ViewBrandGuard, AuthenticationGuard]
  },
  {
    path: 'brands/:id/view',
    component: BrandAddComponent,
    canActivate: [EditBrandGuard, AuthenticationGuard]
  },
  {
    path: 'brands/add',
    component: BrandAddComponent,
    canActivate: [AddBrandGuard, AuthenticationGuard]
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
export class BrandRoutingModule {}
