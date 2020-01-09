import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { CategoryAddComponent } from './category-add/category-add.component';


const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'categories/:id/view', component: CategoryAddComponent },
  { path: 'categories/add', component: CategoryAddComponent},
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

export class CategoryRoutingModule { }
