import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from './partials/partials.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { LanguageModule } from './modules/language/language.module';
import { PartnerModule } from './modules/partner/partner.module';
import { LanguageKeyModule } from './modules/language-key/language-key.module';
import { TranslationModule } from './modules/translation/translation.module';
import { PermissionModule } from './modules/permissions/permission.module';
import { RoleModule } from './modules/role/role.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreModule } from './root-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BearerInterceptor } from './core/interceptors/bearer.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { BannerModule } from './modules/banner/banner.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { ApiKeyInterceptor } from './core/interceptors/apiKey.interceptor';


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
    SupplierModule,
    RoleModule,
    BannerModule,
    RootStoreModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false // Restrict extension to log-only mode
    }),

    AuthenticationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
