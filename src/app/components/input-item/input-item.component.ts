import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.component.html',
  styleUrls: ['./input-item.component.sass']
})
export class InputItemComponent implements OnInit {

  constructor() { }

  @Input() id: string;
  @Input() name: string;
  @Input() title: string;
  @Input() type = 'text';
  @Input() formControlItem: FormControl;
  @Input() validationMessages: any;

  ngOnInit() {
  }

}