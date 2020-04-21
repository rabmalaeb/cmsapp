import { Observable, of } from 'rxjs';

export class NavItem {
  constructor(
    public name: ModuleName,
    public link: string,
    public isActive: Observable<boolean> = of(true),
    public iconName: string
  ) { }
}

export enum ModuleName {
  ADMINS = 'Admins',
  USERS = 'Users',
  PARTNERS = 'Partners',
  PRODUCTS = 'Products',
  CATEGORIES = 'Categories',
  LANGUAGES = 'Languages',
  LANGUAGE_KEYS = 'Language Keys',
  TRANSLATIONS = 'Translations',
  PERMISSIONS = 'Permissions',
  ROLES = 'Roles',
  BANNERS = 'Banners',
  SUPPLIERS = 'Suppliers'
}
