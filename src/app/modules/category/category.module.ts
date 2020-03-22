import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryAddComponent } from './category-add/category-add.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryFiltersComponent } from './category-filters/category-filters.component';

@NgModule({
  declarations: [CategoriesComponent, CategoryAddComponent, CategoryFormComponent, CategoryFiltersComponent],
  imports: [CommonModule, CategoryRoutingModule, ComponentsModule, SharedModule]
})
export class CategoryModule {}
