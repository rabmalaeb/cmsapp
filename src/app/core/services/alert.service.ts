import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { Alert, AlertType } from 'src/app/shared/models/alert';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  confirmResponse: Subject<boolean> = new Subject<boolean>();

  constructor(public dialog: MatDialog) {}

  alert(text: string, buttonText: string, callBack: () => void = null) {
    return this.openDialog(text, AlertType.ALERT, null, buttonText, callBack);
  }

  alertSuccess(text: string, buttonText: string, callBack: () => void = null) {
    return this.openDialog(
      text,
      AlertType.ALERT_SUCCESS,
      null,
      buttonText,
      callBack
    );
  }

  alertFailure(text: string, buttonText: string, callBack: () => void = null) {
    return this.openDialog(
      text,
      AlertType.ALERT_FAILURE,
      null,
      buttonText,
      callBack
    );
  }

  confirm(
    text: string,
    okButtonText: string,
    cancelButtonText: string,
    onsuccessCallBack: () => void = null,
    onFailureCallBack: () => void = null
  ) {
    this.openDialog(
      text,
      AlertType.CONFIRM,
      okButtonText,
      cancelButtonText,
      onsuccessCallBack,
      onFailureCallBack
    );
  }

  confirmDelete(text: string, onsuccessCallBack: () => void = null) {
    this.openDialog(
      text,
      AlertType.CONFIRM_DELETE,
      'Yes',
      'No',
      onsuccessCallBack
    );
  }

  confirmUpdate(
    text: string,
    okButtonText: string,
    cancelButtonText: string,
    onsuccessCallBack: () => void = null,
    onFailureCallBack: () => void = null
  ) {
    this.openDialog(
      text,
      AlertType.CONFIRM_UPDATE,
      okButtonText,
      cancelButtonText,
      onsuccessCallBack,
      onFailureCallBack
    );
  }

  private openDialog(
    text: string,
    type: AlertType,
    okButtonText = 'lbl-yes',
    cancelButtonText = 'lbl-no',
    onsuccessCallBack: () => void = null,
    onFailureCallBack: () => void = null
  ) {
    const alert = new Alert();
    const dialogConfig = new MatDialogConfig();
    alert.type = type;
    alert.text = text;
    alert.okButtonText = okButtonText;
    alert.cancelButtonText = cancelButtonText;
    dialogConfig.data = alert;
    const dialogRef = this.dialog.open(AlertComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (onsuccessCallBack) {
          this.confirmResponse.next(true);
          onsuccessCallBack();
        }
      } else {
        if (onFailureCallBack) {
          this.confirmResponse.next(false);
          onFailureCallBack();
        }
      }
    });
  }
}
