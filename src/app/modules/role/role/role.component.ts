import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
  ) {
    activatedRoute.params.forEach(param => {
      if (param.id) {
        this.getRole(param.id);
      }
    });
  }

  ngOnInit() {
  }

  getRole(id: number) {
    this.roleService.getRole(id).subscribe(response => {
      console.log('repo ', response);
    });
  }

}
