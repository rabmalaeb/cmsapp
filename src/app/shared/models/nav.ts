import { Observable } from "rxjs";

export interface NavItemOptions {
  name: string;
  link: string;
  isActive: Observable<boolean>;
  iconName: string;
  group: NavGroup;
}

export class NavItem {
  constructor(public options: NavItemOptions) {}
}

export enum ModuleName {
  ADMINS = "Admins",
  USERS = "Users",
  PARTNERS = "Partners",
  PRODUCTS = "Products",
  CATEGORIES = "Categories",
  LANGUAGES = "Languages",
  LANGUAGE_KEYS = "Language Keys",
  TRANSLATIONS = "Translations",
  PERMISSIONS = "Permissions",
  ROLES = "Roles",
  BANNERS = "Banners",
  SUPPLIERS = "Suppliers",
  BRANDS = "Brands",
  MANUFACTURERS = "Manufacturers",
}

export enum NavGroup {
  LANGUAGE = "Language",
  PRODUCT = "Product",
  SECURITY = "Security",
  INTERACTIONS = "Interactions",
  GENERAL = "General",
}

export interface GroupedNavItems {
  name: NavGroup;
  items: NavItem[];
}
