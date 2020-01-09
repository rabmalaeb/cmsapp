import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private permissionService: PermissionService,
  ) {
    activatedRoute.params.forEach(param => {
      if (param.id) {
        this.getPermission(param.id);
      }
    });
  }

  ngOnInit() {
  }

  getPermission(id: number) {
    this.permissionService.getPermission(id).subscribe(response => {
      console.log('repo ', response);
    });
  }

}
