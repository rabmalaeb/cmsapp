import FilterRequest from 'src/app/shared/request';

export class LanguageKey {
  id: number;
  name: string;
  description: string;
}

export class LanguageKeyRequest extends FilterRequest {}
