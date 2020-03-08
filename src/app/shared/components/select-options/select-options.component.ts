import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OptionItem } from 'src/app/shared/models/general';

@Component({
  selector: 'app-select-options',
  templateUrl: './select-options.component.html',
  styleUrls: ['./select-options.component.scss']
})
export class SelectOptionsComponent implements OnInit {
  constructor() {}

  @Input() options: OptionItem[];
  @Input() title: string;
  @Output() selected = new EventEmitter<any>();

  ngOnInit() {}

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

  toggle(option: OptionItem) {
    option.selected = !option.selected;
  }

  submitFilters() {
    this.selected.emit();
  }

  toggleOptions() {
    const selected = !this.selectAllChecked;
    this.options.forEach(option => {
      option.selected = selected;
    });
  }

  get atLeaseOneOptionChecked() {
    let isChecked = false;
    this.options.forEach(option => {
      if (option.selected) {
        console.log('option ', option);

        isChecked = true;
      }
    });
    return isChecked;
  }
}
