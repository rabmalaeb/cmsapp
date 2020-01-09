import { Injectable } from '@angular/core';
import { NavItem, ModuleName } from 'src/app/models/general';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private authorizationService: AuthorizationService
  ) {}

  private navBarItems = [
    new NavItem(
      ModuleName.ADMINS,
      'admins',
      this.authorizationService.canView(ModuleName.ADMINS)
    ),
    new NavItem(
      ModuleName.USERS,
      'users',
      this.authorizationService.canView(ModuleName.USERS)
    ),
    new NavItem(
      ModuleName.PARTNERS,
      'partners',
      this.authorizationService.canView(ModuleName.PARTNERS)
    ),
    new NavItem(
      ModuleName.PRODUCTS,
      'products',
      this.authorizationService.canView(ModuleName.PRODUCTS)
    ),
    new NavItem(
      ModuleName.CATEGORIES,
      'categories',
      this.authorizationService.canView(ModuleName.CATEGORIES)
    ),
    new NavItem(
      ModuleName.LANGUAGES,
      'languages',
      this.authorizationService.canView(ModuleName.LANGUAGES)
    ),
    new NavItem(
      ModuleName.LANGUAGE_KEYS,
      'keys',
      this.authorizationService.canView(ModuleName.LANGUAGE_KEYS)
    ),
    new NavItem(
      ModuleName.TRANSLATIONS,
      'translations',
      this.authorizationService.canView(ModuleName.TRANSLATIONS)
    ),
    new NavItem(
      ModuleName.PERMISSIONS,
      'permissions',
      this.authorizationService.canView(ModuleName.PERMISSIONS)
    ),
    new NavItem(
      ModuleName.ROLES,
      'roles',
      this.authorizationService.canView(ModuleName.ROLES)
    )
  ];

  get activeNavBarItems() {
    return this.navBarItems.filter(items => items.isActive);
  }
}
