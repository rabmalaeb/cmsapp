import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertType } from 'src/app/models/general';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.text = data.text;
    this.type = data.type;
    this.okButtonText = data.okButtonText;
    this.cancelButtonText = data.cancelButtonText;
   }

  text = '';
  type = AlertType.ALERT;
  okButtonText = '';
  cancelButtonText = '';
  title: '';


  ngOnInit() {

  }

  get isAlert() {
    return this.type === AlertType.ALERT;
  }


}
