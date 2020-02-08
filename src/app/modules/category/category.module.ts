import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryAddComponent } from './category-add/category-add.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared.module';
import { CategoryFormComponent } from './category-form/category-form.component';

@NgModule({
  declarations: [CategoriesComponent, CategoryAddComponent, CategoryFormComponent],
  imports: [CommonModule, CategoryRoutingModule, ComponentsModule, SharedModule]
})
export class CategoryModule {}
