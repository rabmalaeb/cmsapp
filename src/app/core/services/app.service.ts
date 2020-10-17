import { Injectable } from '@angular/core';
import {
  NavItem,
  ModuleName,
  NavGroup,
  GroupedNavItems,
} from 'src/app/shared/models/nav';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private returnUrl: string;
  private isMenuOpened: boolean;

  constructor(private authorizationService: AuthorizationService) {}

  private navBarItems = [
    new NavItem({
      name: ModuleName.ADMINS,
      link: 'admins',
      isActive: this.authorizationService.canView(ModuleName.ADMINS),
      iconName: 'account',
      group: NavGroup.GENERAL,
    }),
    new NavItem({
      name: ModuleName.USERS,
      link: 'users',
      isActive: this.authorizationService.canView(ModuleName.USERS),
      iconName: 'accounts',
      group: NavGroup.GENERAL,
    }),
    new NavItem({
      name: ModuleName.PARTNERS,
      link: 'partners',
      isActive: this.authorizationService.canView(ModuleName.PARTNERS),
      iconName: 'card-travel',
      group: NavGroup.GENERAL,
    }),
    new NavItem({
      name: ModuleName.PRODUCTS,
      link: 'products',
      isActive: this.authorizationService.canView(ModuleName.PRODUCTS),
      iconName: 'collection-item',
      group: NavGroup.PRODUCT,
    }),
    new NavItem({
      name: ModuleName.CATEGORIES,
      link: 'categories',
      isActive: this.authorizationService.canView(ModuleName.CATEGORIES),
      iconName: 'view-list',
      group: NavGroup.PRODUCT,
    }),
    new NavItem({
      name: ModuleName.LANGUAGES,
      link: 'languages',
      isActive: this.authorizationService.canView(ModuleName.LANGUAGES),
      iconName: 'font',
      group: NavGroup.LANGUAGE,
    }),
    new NavItem({
      name: ModuleName.LANGUAGE_KEYS,
      link: 'keys',
      isActive: this.authorizationService.canView(ModuleName.LANGUAGE_KEYS),
      iconName: 'key',
      group: NavGroup.LANGUAGE,
    }),
    new NavItem({
      name: ModuleName.TRANSLATIONS,
      link: 'translations',
      isActive: this.authorizationService.canView(ModuleName.TRANSLATIONS),
      iconName: 'translate',
      group: NavGroup.LANGUAGE,
    }),
    new NavItem({
      name: ModuleName.PERMISSIONS,
      link: 'permissions',
      isActive: this.authorizationService.canView(ModuleName.PERMISSIONS),
      iconName: 'lock',
      group: NavGroup.SECURITY,
    }),
    new NavItem({
      name: ModuleName.ROLES,
      link: 'roles',
      isActive: this.authorizationService.canView(ModuleName.ROLES),
      iconName: 'accounts-alt',
      group: NavGroup.SECURITY,
    }),
    new NavItem({
      name: ModuleName.BANNERS,
      link: 'banners',
      isActive: this.authorizationService.canView(ModuleName.BANNERS),
      iconName: 'collection-image',
      group: NavGroup.INTERACTIONS,
    }),
    new NavItem({
      name: ModuleName.SUPPLIERS,
      link: 'suppliers',
      isActive: this.authorizationService.canView(ModuleName.SUPPLIERS),
      iconName: 'truck',
      group: NavGroup.PRODUCT,
    }),
    new NavItem({
      name: ModuleName.BRANDS,
      link: 'brands',
      isActive: this.authorizationService.canView(ModuleName.BRANDS),
      iconName: 'truck',
      group: NavGroup.PRODUCT,
    }),
    new NavItem({
      name: ModuleName.MANUFACTURERS,
      link: 'manufacturers',
      isActive: this.authorizationService.canView(ModuleName.MANUFACTURERS),
      iconName: 'truck',
      group: NavGroup.PRODUCT,
    }),
  ];

  get activeNavBarItems() {
    return this.navBarItems.filter((items) => items);
  }

  groupedNavItems(): GroupedNavItems[] {
    const groupedNavItems: GroupedNavItems[] = [];
    this.navBarItems.forEach((item) => {
      const group = groupedNavItems.find(
        (groupItem) => groupItem.name === item.options.group
      );
      if (!group) {
        groupedNavItems.push({
          name: item.options.group,
          items: [],
        });
      }
    });
    this.navBarItems.forEach((item) => {
      groupedNavItems.forEach(group => {
        if (item.options.group === group.name) {
          group.items.push(item);
        }
      });
    });
    return groupedNavItems;
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

  setIsMenuOpened(value: boolean) {
    this.isMenuOpened = value;
  }

  getIsMenuOpened() {
    return this.isMenuOpened;
  }
}
