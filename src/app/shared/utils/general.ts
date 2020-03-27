import { NumberRange } from '../models/general';

export function inArray(value: string, array: Array<string>): boolean {
  return array.find(item => item === value) ? true : false;
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function isRangeValid(range: NumberRange) {
  return range && range.minimum <= range.maximum;
}

export function createFormDataFromObject(object: {}) {
  const formData = new FormData();
  Object.entries(object).forEach(([key, value]: [string, string | Blob]) => {
    value instanceof File
      ? formData.append(key, value, value.name)
      : formData.append(key, value);
  });
  return formData;
}
