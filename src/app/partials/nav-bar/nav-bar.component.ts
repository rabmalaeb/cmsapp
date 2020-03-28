import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../shared/models/nav';
import { AppService } from '../../core/services/app.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  constructor(
    private appService: AppService,
  ) {}

  ngOnInit() {}

  get navBarItems(): NavItem[] {
    return this.appService.activeNavBarItems;
  }
}
