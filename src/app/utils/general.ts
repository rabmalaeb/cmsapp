export function inArray(value: string, array: Array<string>): boolean {
  return array.find(item => item === value) ? true : false;
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
