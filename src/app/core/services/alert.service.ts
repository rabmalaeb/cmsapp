import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { Alert, AlertType } from 'src/app/shared/models/general';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  confirmResponse: Subject<boolean> = new Subject<boolean>();

  constructor(public dialog: MatDialog) {}

  alert(text: string, buttonText: string, callBack: () => void = null) {
    const alert = new Alert();
    const dialogConfig = new MatDialogConfig();
    alert.text = text;
    alert.cancelButtonText = buttonText;
    alert.type = AlertType.ALERT;
    dialogConfig.data = alert;
    return this.openDialog(dialogConfig, callBack);
  }

  confirm(
    text: string,
    okButtonText: string,
    cancelButtonText: string,
    onsuccessCallBack: () => void = null,
    onFailureCallBack: () => void = null
  ) {
    const alert = new Alert();
    const dialogConfig = new MatDialogConfig();
    alert.text = text;
    alert.okButtonText = okButtonText;
    alert.cancelButtonText = cancelButtonText;
    alert.type = AlertType.CONFIRM;
    dialogConfig.data = alert;
    this.openDialog(dialogConfig, onsuccessCallBack, onFailureCallBack);
  }

  /**
   * This is used when the user wants to navigate from a guarded route
   * @param message the message to be displayed
   */
  confirmExit(message: string) {
    const alert = new Alert();
    const dialogConfig = new MatDialogConfig();
    alert.type = AlertType.CONFIRM;
    alert.text = message;
    alert.okButtonText = 'lbl-yes';
    alert.cancelButtonText = 'lbl-no';
    dialogConfig.data = alert;
    this.openDialog(dialogConfig, () => {}, () => {});
  }

  private openDialog(
    dialogConfig: MatDialogConfig,
    onsuccessCallBack: () => void = null,
    onFailureCallBack: () => void = null
  ) {
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
