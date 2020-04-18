import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { ViewSupplierGuard } from './guards/view-supplier.guard';
import { EditSupplierGuard } from './guards/edit-supplier.guard';
import { AddSupplierGuard } from './guards/add-supplier.guard';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'suppliers',
    component: SuppliersComponent,
    canActivate: [ViewSupplierGuard, AuthenticationGuard]
  },
  {
    path: 'suppliers/:id/view',
    component: SupplierAddComponent,
    canActivate: [EditSupplierGuard, AuthenticationGuard]
  },
  {
    path: 'suppliers/add',
    component: SupplierAddComponent,
    canActivate: [AddSupplierGuard, AuthenticationGuard]
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
export class SupplierRoutingModule {}
