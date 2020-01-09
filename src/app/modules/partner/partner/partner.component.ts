import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PartnerService } from '../partner.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private partnerService: PartnerService,
  ) {
    activatedRoute.params.forEach(param => {
      if (param.id) {
        this.getPartner(param.id);
      }
    });
  }

  ngOnInit() {
  }

  getPartner(id: number) {
    this.partnerService.getPartner(id).subscribe(response => {
      console.log('repo ', response);
    });
  }

}
