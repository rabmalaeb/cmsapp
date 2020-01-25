import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PartialsModule } from './partials/partials.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { LanguageModule } from './modules/language/language.module';
import { PartnerModule } from './modules/partner/partner.module';
import { LanguageKeyModule } from './modules/languagekey/languagekey.module';
import { TranslationModule } from './modules/translation/translation.module';
import { PermissionModule } from './modules/permissions/permission.module';
import { RoleModule } from './modules/role/role.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './modules/login/login.module';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreModule } from './root-store';


@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    PartialsModule,
    BrowserModule,
    AdminModule,
    UserModule,
    CategoryModule,
    ProductModule,
    PartnerModule,
    LanguageModule,
    LanguageKeyModule,
    TranslationModule,
    PermissionModule,
    RoleModule,
    RootStoreModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false // Restrict extension to log-only mode
    }),

    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
