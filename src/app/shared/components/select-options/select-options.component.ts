import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OptionItem } from 'src/app/shared/models/general';

@Component({
  selector: 'app-select-options',
  templateUrl: './select-options.component.html',
  styleUrls: ['./select-options.component.sass']
})
export class SelectOptionsComponent implements OnInit {

  constructor() { }

  @Input() options: OptionItem[];
  @Output() selected = new EventEmitter<any>();

  ngOnInit() {
  }

  get selectAllChecked() {
    let isChecked = true;
    if (!this.options) {
      return false;
    }
    this.options.forEach(option => {
      if (!option.selected) {
        isChecked = false;
      }
    });
    return isChecked;
  }

}
