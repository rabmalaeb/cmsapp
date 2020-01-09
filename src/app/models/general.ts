export class NavItem {
  constructor(

    public name: ModuleName,
    public link: string,
    public isActive: boolean = true
  ) {}
}

export enum USER_MESSAGES {
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
  DELETE = 'delete',
}

export enum ActionType {
  EDIT = 'edit',
  ADD = 'add'
}

export enum ModuleName {
  ADMINS = 'admins',
  USERS = 'users',
  PARTNERS = 'partners',
  PRODUCTS = 'products',
  CATEGORIES = 'categories',
  LANGUAGES = 'languages',
  LANGUAGE_KEYS = 'language keys',
  TRANSLATIONS = 'translations',
  PERMISSIONS = 'permissions',
  ROLES = 'roles',
}
