import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';
import { Partner } from '../partner';
import { PartnerService } from '../partner.service';
import { ModuleName } from 'src/app/models/general';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  isLoading = false;
  partners: Partner[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'code',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private partnerService: PartnerService,
    private alertService: AlertService,
    private router: Router,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit() {
    this.getPartners();
  }

  getPartners() {
    this.isLoading = true;
    this.partnerService.getPartners().subscribe(response => {
      this.isLoading = false;
      this.partners = response;
      this.setDataSource();
    });
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Partner>(this.partners);
    this.dataSource.paginator = this.paginator;
  }
  addPartner() {
    this.router.navigate(['partners/add']);
  }

  editPartner(id: number) {
    this.router.navigate([`partners/${id}/view`]);
  }

  viewPartner(id: number) {
    this.router.navigate([`partner/${id}`]);
  }

  deletePartner(id: number) {
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.partnerService.deletePartner(id).subscribe(response => {
          this.partners = response;
          this.setDataSource();
        });
      }
    );
  }

  get canAddPartner() {
    return this.authorizationService.canAdd(ModuleName.PARTNERS);
  }

  get canDeletePartner() {
    return this.authorizationService.canDelete(ModuleName.PARTNERS);
  }

}
