import { Component, OnInit, Input } from '@angular/core';
import { Permission } from '../permission';

@Component({
  selector: 'app-permission-item',
  templateUrl: './permission-item.component.html',
  styleUrls: ['./permission-item.component.scss']
})
export class PermissionItemComponent implements OnInit {

  constructor() { }

  @Input() permission: Permission;

  ngOnInit() {
  }

}
