import FilterRequest from 'src/app/shared/request';

export class Language {
  id: number;
  name: string;
  code: string;
}
export class LanguageRequest extends FilterRequest {}
