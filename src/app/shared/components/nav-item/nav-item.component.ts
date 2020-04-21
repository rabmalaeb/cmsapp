import { Component, OnInit, Input } from '@angular/core';
import { NavItem } from '../../models/nav';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {

  @Input() navItem: NavItem;

  constructor() { }

  ngOnInit() {
  }

}
