import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';
import { LanguageKey } from '../languagekey';
import { LanguageKeyService } from '../languagekey.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleName } from 'src/app/models/general';

@Component({
  selector: 'app-languagekeys',
  templateUrl: './languagekeys.component.html',
  styleUrls: ['./languagekeys.component.scss']
})
export class LanguageKeysComponent implements OnInit {
  isLoading = false;
  languagekeys: LanguageKey[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'action'
  ];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private languagekeyService: LanguageKeyService,
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getLanguageKeys();
  }

  getLanguageKeys() {
    this.isLoading = true;
    this.languagekeyService.getLanguageKeys().subscribe(response => {
      this.isLoading = false;
      this.languagekeys = response;
      this.setDataSource();
    });
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<LanguageKey>(this.languagekeys);
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
        this.languagekeyService.deleteLanguageKey(id).subscribe(response => {
          this.languagekeys = response;
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
