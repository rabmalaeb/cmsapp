import { Injectable } from '@angular/core';
import { NavItem, ModuleName } from 'src/app/shared/models/nav';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private returnUrl: string;

  constructor(
    private authorizationService: AuthorizationService
  ) {}

  private navBarItems = [
    new NavItem(
      ModuleName.ADMINS,
      'admins',
      this.authorizationService.canView(ModuleName.ADMINS),
      'supervisor_account'
    ),
    new NavItem(
      ModuleName.USERS,
      'users',
      this.authorizationService.canView(ModuleName.USERS),
      'person'
    ),
    new NavItem(
      ModuleName.PARTNERS,
      'partners',
      this.authorizationService.canView(ModuleName.PARTNERS),
      'business'
    ),
    new NavItem(
      ModuleName.PRODUCTS,
      'products',
      this.authorizationService.canView(ModuleName.PRODUCTS),
      'shopping_cart'
    ),
    new NavItem(
      ModuleName.CATEGORIES,
      'categories',
      this.authorizationService.canView(ModuleName.CATEGORIES),
      'list'
    ),
    new NavItem(
      ModuleName.LANGUAGES,
      'languages',
      this.authorizationService.canView(ModuleName.LANGUAGES),
      'language'
    ),
    new NavItem(
      ModuleName.LANGUAGE_KEYS,
      'keys',
      this.authorizationService.canView(ModuleName.LANGUAGE_KEYS),
      'vpn_key'
    ),
    new NavItem(
      ModuleName.TRANSLATIONS,
      'translations',
      this.authorizationService.canView(ModuleName.TRANSLATIONS),
      'translate'
    ),
    new NavItem(
      ModuleName.PERMISSIONS,
      'permissions',
      this.authorizationService.canView(ModuleName.PERMISSIONS),
      'lock'
    ),
    new NavItem(
      ModuleName.ROLES,
      'roles',
      this.authorizationService.canView(ModuleName.ROLES),
      'lock_open'
    ),
    new NavItem(
      ModuleName.BANNERS,
      'banners',
      this.authorizationService.canView(ModuleName.BANNERS),
      'filter'
    ),
    new NavItem(
      ModuleName.SUPPLIERS,
      'suppliers',
      this.authorizationService.canView(ModuleName.SUPPLIERS),
      'airport_shuttle'
    )
  ];

  get activeNavBarItems() {
    return this.navBarItems.filter(items => items);
  }

  getNavBarItems() {
    return this.navBarItems;
  }

  setReturnUrl(url: string) {
    this.returnUrl = url;
  }

  getReturnUrl() {
    return this.returnUrl;
  }
}
