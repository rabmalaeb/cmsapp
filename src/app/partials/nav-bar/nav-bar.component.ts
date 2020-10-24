import { Component, OnInit } from '@angular/core';
import { GroupedNavItems } from '../../shared/models/nav';
import { AppService } from '../../core/services/app.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  navBarGroups: GroupedNavItems[];
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.navBarGroups = this.appService
      .groupedNavItems()
      .filter(group => group.items.length > 0);

  }
}
