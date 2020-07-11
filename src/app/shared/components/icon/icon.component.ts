import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  /**
   * name of the icon to be used. Currently using material icons
   */
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }

}
