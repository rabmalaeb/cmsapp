import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ViewProductGuard } from './guards/view-product.guard';
import { EditProductGuard } from './guards/edit-product.guard';
import { AddProductGuard } from './guards/add-product.guard';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [ViewProductGuard, AuthenticationGuard]
  },
  {
    path: 'products/:id/view',
    component: ProductAddComponent,
    canActivate: [EditProductGuard, AuthenticationGuard]
  },
  {
    path: 'products/add',
    component: ProductAddComponent,
    canActivate: [AddProductGuard, AuthenticationGuard]
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
export class ProductRoutingModule {}
