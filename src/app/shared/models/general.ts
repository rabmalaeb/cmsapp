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

export interface NumberRange {
  minimum: number;
  maximum: number;
}

export class OptionItem {
  constructor(
    public label: string,
    public value: any,
    public selected = false
  ) {}
}

export enum StorageParams {
  RESET_PASSWORD_IDENTIFIER = 'reset_password_identifier',
  CURRENT_USER = 'currentUser'
}

export enum BOOLEANS {
  TRUE = 'True',
  FALSE = 'False'
}
