import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
  ) {
    activatedRoute.params.forEach(param => {
      if (param.id) {
        this.getAdmin(param.id);
      }
    });
  }

  ngOnInit() {
  }

  getAdmin(id: number) {
    this.adminService.getAdmin(id).subscribe(response => {
      console.log('repo ', response);
    });
  }

}
