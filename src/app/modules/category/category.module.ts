import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryAddComponent } from './category-add/category-add.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [CategoriesComponent, CategoryAddComponent],
  imports: [CommonModule, CategoryRoutingModule, ComponentsModule, SharedModule]
})
export class CategoryModule {}
