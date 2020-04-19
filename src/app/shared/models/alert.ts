export class Alert {
  type: AlertType;
  title?: string;
  text: string;
  okButtonText: string;
  cancelButtonText: string;
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
