import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-item',
  templateUrl: './button-item.component.html',
  styleUrls: ['./button-item.component.scss']
})
export class ButtonItemComponent implements OnInit {
  @Input() label: string;
  @Input() type = 'submit';
  @Input() isSecondary: boolean;
  @Input() disabled: boolean;
  @Input() link: string;

  constructor() {}

  ngOnInit(): void {}
}
