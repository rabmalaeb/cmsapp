import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) {
    activatedRoute.params.forEach(param => {
      if (param.id) {
        this.getUser(param.id);
      }
    });
  }

  ngOnInit() {
  }

  getUser(id: number) {
    this.userService.getUser(id).subscribe(response => {
      console.log('repo ', response);
    });
  }

}
