import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';
import { Language } from '../language';
import { LanguageService } from '../language.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleName } from 'src/app/models/general';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {
  isLoading = false;
  languages: Language[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'code',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private languageService: LanguageService,
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getLanguages();
  }

  getLanguages() {
    this.isLoading = true;
    this.languageService.getLanguages().subscribe(response => {
      this.isLoading = false;
      this.languages = response;
      this.setDataSource();
    });
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Language>(this.languages);
    this.dataSource.paginator = this.paginator;
  }
  addLanguage() {
    this.router.navigate(['languages/add']);
  }

  editLanguage(id: number) {
    this.router.navigate([`languages/${id}/view`]);
  }

  viewLanguage(id: number) {
    this.router.navigate([`language/${id}`]);
  }

  deleteLanguage(id: number) {
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.languageService.deleteLanguage(id).subscribe(response => {
          this.languages = response;
          this.setDataSource();
        });
      }
    );
  }

  get canAddLanguage() {
    return this.authorizationService.canAdd(ModuleName.LANGUAGES);
  }

  get canDeleteLanguage() {
    return this.authorizationService.canDelete(ModuleName.LANGUAGES);
  }
}
