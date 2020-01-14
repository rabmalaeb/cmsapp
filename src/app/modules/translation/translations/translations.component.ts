import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';
import { Translation } from '../translation';
import { TranslationService } from '../translation.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleName } from 'src/app/models/general';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss']
})
export class TranslationsComponent implements OnInit {
  isLoading = false;
  translations: Translation[] = [];
  displayedColumns: string[] = [
    'id',
    'language',
    'partner',
    'key',
    'value',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private translationService: TranslationService,
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTranslations();
  }

  getTranslations() {
    this.isLoading = true;
    this.translationService.getTranslations().subscribe(response => {
      this.isLoading = false;
      this.translations = response;
      this.setDataSource();
    });
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Translation>(this.translations);
    this.dataSource.paginator = this.paginator;
  }

  addTranslation() {
    this.router.navigate(['translations/add']);
  }

  editTranslation(id: number) {
    this.router.navigate([`translations/${id}/view`]);
  }

  viewTranslation(id: number) {
    this.router.navigate([`translation/${id}`]);
  }

  deleteTranslation(id: number) {
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.translationService.deleteTranslation(id).subscribe(response => {
          this.translations = response;
          this.setDataSource();
        });
      }
    );
  }

  get canAddTranslation() {
    return this.authorizationService.canAdd(ModuleName.TRANSLATIONS);
  }

  get canDeleteTranslation() {
    return this.authorizationService.canDelete(ModuleName.TRANSLATIONS);
  }
}
