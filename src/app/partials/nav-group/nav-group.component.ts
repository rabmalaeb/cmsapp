import { Component, Input, OnInit } from '@angular/core';
import { NavGroup, NavItem } from 'src/app/shared/models/nav';

@Component({
  selector: 'app-nav-group',
  templateUrl: './nav-group.component.html',
  styleUrls: ['./nav-group.component.scss'],
})
export class NavGroupComponent implements OnInit {
  constructor() {}

  @Input() group: NavGroup;
  @Input() items: NavItem[];
  showChildren = true;

  ngOnInit(): void {}

  toggleChildren() {
    this.showChildren = !this.showChildren;
  }
}
