import { Component, OnInit, Input } from '@angular/core';
import { NavItem, NavItemOptions } from '../../models/nav';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {

  @Input() navItem: NavItemOptions;

  constructor() { }

  ngOnInit() {
  }

}
