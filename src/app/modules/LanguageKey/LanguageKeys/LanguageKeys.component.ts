import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';
import { LanguageKey } from '../LanguageKey';
import { LanguageKeyService } from '../LanguageKey.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleName } from 'src/app/models/general';

@Component({
  selector: 'app-languageKeys',
  templateUrl: './languageKeys.component.html',
  styleUrls: ['./languageKeys.component.scss']
})
export class LanguageKeysComponent implements OnInit {
  isLoading = false;
  languageKeys: LanguageKey[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'action'
  ];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private languageKeyService: LanguageKeyService,
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getLanguageKeys();
  }

  getLanguageKeys() {
    this.isLoading = true;
    this.languageKeyService.getLanguageKeys().subscribe(response => {
      this.isLoading = false;
      this.languageKeys = response;
      this.setDataSource();
    });
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<LanguageKey>(this.languageKeys);
    this.dataSource.paginator = this.paginator;
  }
  addLanguageKey() {
    this.router.navigate(['keys/add']);
  }

  editLanguageKey(id: number) {
    this.router.navigate([`keys/${id}/view`]);
  }

  viewLanguageKey(id: number) {
    this.router.navigate([`key/${id}`]);
  }

  deleteLanguageKey(id: number) {
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.languageKeyService.deleteLanguageKey(id).subscribe(response => {
          this.languageKeys = response;
          this.setDataSource();
        });
      }
    );
  }

  get canAddKey() {
    return this.authorizationService.canAdd(ModuleName.LANGUAGE_KEYS);
  }

  get canDeleteKey() {
    return this.authorizationService.canDelete(ModuleName.LANGUAGE_KEYS);
  }
}
