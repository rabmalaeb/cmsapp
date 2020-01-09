import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { NavItem } from 'src/app/models/general';

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
