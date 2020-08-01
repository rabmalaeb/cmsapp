import { Component, OnInit, Input } from '@angular/core';
import { NavItemOptions } from '../../models/nav';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {

  @Input() navItem: NavItemOptions;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {}

  closeMenu() {
    this.appService.setIsMenuOpened(false);
  }

}
