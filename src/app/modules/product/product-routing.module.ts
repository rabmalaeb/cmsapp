import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ViewProductGuard } from './guards/view-product.guard';
import { EditProductGuard } from './guards/edit-product.guard';
import { AddProductGuard } from './guards/add-product.guard';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [ViewProductGuard]
  },
  { path: 'product/:id', component: ProductComponent },
  {
    path: 'products/:id/view',
    component: ProductAddComponent,
    canActivate: [EditProductGuard]
  },
  {
    path: 'products/add',
    component: ProductAddComponent,
    canActivate: [AddProductGuard]
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
export class ProductRoutingModule {}
