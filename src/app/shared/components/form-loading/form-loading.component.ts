import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-loading',
  templateUrl: './form-loading.component.html',
  styleUrls: ['./form-loading.component.scss']
})
export class FormLoadingComponent implements OnInit {

  constructor() { }

  @Input() size: number;

  ngOnInit() {
  }

}
