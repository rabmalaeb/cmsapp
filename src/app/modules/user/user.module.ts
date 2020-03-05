import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserAddComponent } from './user-add/user-add.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UserFiltersComponent } from './user-filters/user-filters.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserAddComponent,
    UserFormComponent,
    UserFiltersComponent
  ],
  imports: [CommonModule, UserRoutingModule, ComponentsModule, SharedModule]
})
export class UserModule {}
