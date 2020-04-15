import { UserStoreState } from '../modules/user/store';
import { RoleStoreState } from '../modules/role/store';
import { PermissionStoreState } from '../modules/permissions/store';
import { AdminStoreState } from '../modules/admin/store';
import { PartnerStoreState } from '../modules/partner/store';
import { LanguagekeyStoreState } from '../modules/language-key/store';
import { LanguageStoreState } from '../modules/language/store';
import { TranslationStoreState } from '../modules/translation/store';
import { LoginStoreState } from '../modules/authentication/store';
import { BannerStoreState } from '../modules/banner/store';
import { SupplierStoreState } from '../modules/supplier/store';

export interface State {
  user: UserStoreState.State;
  role: RoleStoreState.State;
  admin: AdminStoreState.State;
  partner: PartnerStoreState.State;
  permission: PermissionStoreState.State;
  languageKey: LanguagekeyStoreState.State;
  language: LanguageStoreState.State;
  translation: TranslationStoreState.State;
  login: LoginStoreState.State;
  banner: BannerStoreState.State;
  supplier: SupplierStoreState.State;
}
