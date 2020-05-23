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
    new NavItem({
      name: ModuleName.ADMINS,
      link: 'admins',
      isActive: this.authorizationService.canView(ModuleName.ADMINS),
      iconName: 'account'
    }),
    new NavItem({
      name: ModuleName.USERS,
      link: 'users',
      isActive: this.authorizationService.canView(ModuleName.USERS),
      iconName: 'accounts'
    }),
    new NavItem({
      name: ModuleName.PARTNERS,
      link: 'partners',
      isActive: this.authorizationService.canView(ModuleName.PARTNERS),
      iconName: 'card-travel'
    }),
    new NavItem({
      name: ModuleName.PRODUCTS,
      link: 'products',
      isActive: this.authorizationService.canView(ModuleName.PRODUCTS),
      iconName: 'collection-item'
    }),
    new NavItem({
      name: ModuleName.CATEGORIES,
      link: 'categories',
      isActive: this.authorizationService.canView(ModuleName.CATEGORIES),
      iconName: 'view-list'
    }),
    new NavItem({
      name: ModuleName.LANGUAGES,
      link: 'languages',
      isActive: this.authorizationService.canView(ModuleName.LANGUAGES),
      iconName: 'font'
    }),
    new NavItem({
      name: ModuleName.LANGUAGE_KEYS,
      link: 'keys',
      isActive: this.authorizationService.canView(ModuleName.LANGUAGE_KEYS),
      iconName: 'key'
    }),
    new NavItem({
      name: ModuleName.TRANSLATIONS,
      link: 'translations',
      isActive: this.authorizationService.canView(ModuleName.TRANSLATIONS),
      iconName: 'translate'
    }),
    new NavItem({
      name: ModuleName.PERMISSIONS,
      link: 'permissions',
      isActive: this.authorizationService.canView(ModuleName.PERMISSIONS),
      iconName: 'lock'
    }),
    new NavItem({
      name: ModuleName.ROLES,
      link: 'roles',
      isActive: this.authorizationService.canView(ModuleName.ROLES),
      iconName: 'accounts-alt'
    }),
    new NavItem({
      name: ModuleName.BANNERS,
      link: 'banners',
      isActive: this.authorizationService.canView(ModuleName.BANNERS),
      iconName: 'collection-image'
    }),
    new NavItem({
      name: ModuleName.SUPPLIERS,
      link: 'suppliers',
      isActive: this.authorizationService.canView(ModuleName.SUPPLIERS),
      iconName: 'truck'
    })
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
