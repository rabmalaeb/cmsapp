import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserStoreModule } from '../modules/user/store';
import { RoleStoreModule } from '../modules/role/store';
import { PermissionStoreModule } from '../modules/permissions/store';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserStoreModule,
    RoleStoreModule,
    PermissionStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule { }
