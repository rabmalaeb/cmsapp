import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Partner, PartnerRequest } from '../partner';
import { ModuleName } from 'src/app/shared/models/general';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Observable } from 'rxjs';
import { PartnerStoreSelectors, PartnerStoreActions } from '../store';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionTypes } from '../store/actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  isLoading = false;
  partners: Partner[] = [];
  displayedColumns: string[] = ['id', 'name', 'code', 'action'];
  dataSource: MatTableDataSource<any>;
  partners$: Observable<Partner[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private authorizationService: AuthorizationService,
    private store$: Store<RootStoreState.State>,
    private notificationService: NotificationService,
    private actionsSubject$: ActionsSubject
  ) {}

  ngOnInit() {
    this.getPartners();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.partners$ = this.store$.select(
      PartnerStoreSelectors.selectAllPartnerItems
    );

    this.error$ = this.store$.select(
      PartnerStoreSelectors.selectPartnerLoadingError
    );

    this.isLoading$ = this.store$.select(
      PartnerStoreSelectors.selectPartnerIsLoading
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) => action.type === ActionTypes.DELETE_PARTNER_SUCCESS
        )
      )
      .subscribe(() => {
        this.notificationService.showSuccess('Partner Deleted Successfully');
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) => action.type === ActionTypes.DELETE_PARTNER_FAILURE
        )
      )
      .subscribe(errorResponse => {
        this.notificationService.showError(errorResponse.payload.error.message);
      });

    this.actionsSubject$
      .pipe(filter((action: any) => action.type === ActionTypes.LOAD_FAILURE))
      .subscribe(errorResponse => {
        this.notificationService.showError(errorResponse.payload.error.message);
      });
  }

  getPartners(partnerRequest: PartnerRequest = null) {
    this.store$.dispatch(new PartnerStoreActions.LoadRequestAction(partnerRequest));
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
        this.store$.dispatch(
          new PartnerStoreActions.DeletePartnerRequestAction(id)
        );
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
