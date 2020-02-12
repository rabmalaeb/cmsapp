import { AbstractControl } from '@angular/forms';
export class CustomValidations {

  /**
   * this is used when we have two pins to be matched
   * the name of the pins should be pin and confirmPin
   * @param AC
   */
  static MatchPasswords(AC: AbstractControl) {
    if (!AC.get('password')) {
      return null;
    }
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPasswords: true });
    } else {
      return null;
    }
  }

  /**
   * this is used when we have two pins to be matched
   * the name of the pins should be pin and confirmPin
   * @param AC
   */
  static MatchEmails(AC: AbstractControl) {
    if (!AC.get('email')) {
      return null;
    }
    const email = AC.get('email').value; // to get value in input tag
    const confirmEmail = AC.get('confirmEmail').value; // to get value in input tag
    if (email !== confirmEmail) {
      AC.get('confirmEmail').setErrors({ MatchEmails: true });
    } else {
      return null;
    }
  }

  /**
   * this is used when we have two pins to be matched
   * the name of the pins should be pin and confirmPin
   * @param AC
   */
  static MatchMobiles(AC: AbstractControl) {
    if (!AC.get('mobile')) {
      return null;
    }
    const mobile = AC.get('mobile').value; // to get value in input tag
    const confirmMobile = AC.get('confirmMobile').value; // to get value in input tag
    if (mobile !== confirmMobile) {
      AC.get('confirmMobile').setErrors({ MatchMobiles: true });
    } else {
      return null;
    }
  }
}
