export class Alert {
  type: AlertType;
  title?: string;
  text: string;
  okButtonText: string;
  cancelButtonText: string;
}

export enum ALERT_MESSAGES {
  FORM_NOT_VALID = 'The form is not valid'
}

export enum AlertType {
  ALERT,
  ALERT_SUCCESS,
  ALERT_FAILURE,
  CONFIRM,
  CONFIRM_DELETE,
  CONFIRM_UPDATE
}

export interface AlertOptions {
  label: string;
  icon: string;
}
