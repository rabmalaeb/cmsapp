import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserItemComponent } from './user-item/user-item.component';
import { UserComponent } from './user/user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserAddComponent } from './user-add/user-add.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [UsersComponent, UserItemComponent, UserComponent, UserAddComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ComponentsModule,
    SharedModule
  ]
})
export class UserModule { }
