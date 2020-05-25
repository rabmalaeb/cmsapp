import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertType, AlertOptions } from 'src/app/shared/models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit {
  text = '';
  type = AlertType.ALERT;
  okButtonText = '';
  cancelButtonText = '';

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.text = data.text;
    this.type = data.type;
    this.okButtonText = data.okButtonText;
    this.cancelButtonText = data.cancelButtonText;
  }

  ngOnInit() {}

  get isAlert() {
    return this.type === AlertType.ALERT;
  }

  get alertOptions(): AlertOptions {
    switch (this.type) {
      case AlertType.CONFIRM_DELETE:
        return {
          label: 'Confirm Delete',
          icon: 'alert-triangle'
        };
      case AlertType.CONFIRM_UPDATE:
        return {
          label: 'Confirm Update',
          icon: ''
        };
      default:
        return {
          label: 'Confirm',
          icon: 'alert-circle'
        };
    }
  }

  get isDanger() {
    return this.type === AlertType.CONFIRM_DELETE;
  }
}
