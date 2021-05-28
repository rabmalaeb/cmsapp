import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { ViewCategoryGuard } from './guards/view-category.guard';
import { EditCategoryGuard } from './guards/edit-category.guard';
import { AddCategoryGuard } from './guards/add-category.guard';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [ViewCategoryGuard, AuthenticationGuard]
  },
  {
    path: 'categories/:id/view',
    component: CategoryAddComponent,
    canActivate: [EditCategoryGuard, AuthenticationGuard]
  },
  {
    path: 'categories/add',
    component: CategoryAddComponent,
    canActivate: [AddCategoryGuard, AuthenticationGuard]
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
export class CategoryRoutingModule {}
