import { Observable, of } from 'rxjs';

export class NavItem {
  constructor(
    public name: ModuleName,
    public link: string,
    public isActive: Observable<boolean> = of(true)
  ) {}
}

export enum ALERT_MESSAGES {
  FORM_NOT_VALID = 'The form is not valid'
}

export enum AlertType {
  ALERT,
  CONFIRM
}

export class Alert {
  type: AlertType;
  title?: string;
  text: string;
  okButtonText: string;
  cancelButtonText: string;
}

export enum PermissionType {
  VIEW = 'view',
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete'
}

export enum ActionType {
  EDIT = 'edit',
  ADD = 'add'
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

export interface ErrorResponse {
  status: number;
  message: string;
}

export interface NumberRange {
  minimum: number;
  maximum: number;
}

export class OptionItem {
  constructor(public label: string, public value: any, public selected = false) { }
}
