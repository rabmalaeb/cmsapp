import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserStoreModule } from '../modules/user/store';
import { RoleStoreModule } from '../modules/role/store';
import { PermissionStoreModule } from '../modules/permissions/store';
import { AdminStoreModule } from '../modules/admin/store';
import { PartnerStoreModule } from '../modules/partner/store';
import { ProductStoreModule } from '../modules/product/store';
import { LanguageStoreModule } from '../modules/language/store';
import { CategoryStoreModule } from '../modules/category/store';
import { TranslationStoreModule } from '../modules/translation/store';
import { LanguageKeyStoreModule } from '../modules/language-key/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserStoreModule,
    RoleStoreModule,
    AdminStoreModule,
    PartnerStoreModule,
    ProductStoreModule,
    LanguageStoreModule,
    LanguageKeyStoreModule,
    TranslationStoreModule,
    CategoryStoreModule,
    PermissionStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule {}
