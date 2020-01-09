import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product-add/product-add.component';


const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'products/:id/view', component: ProductAddComponent },
  { path: 'products/add', component: ProductAddComponent},
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

export class ProductRoutingModule { }
