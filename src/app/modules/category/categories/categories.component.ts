import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ModuleName } from 'src/app/models/general';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  isLoading = false;
  categories: Category[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'parent',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private categoryService: CategoryService,
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe(response => {
      this.isLoading = false;
      this.categories = response;
      this.setDataSource();
    });
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Category>(this.categories);
    this.dataSource.paginator = this.paginator;
  }
  addCategory() {
    this.router.navigate(['categories/add']);
  }

  editCategory(id: number) {
    this.router.navigate([`categories/${id}/view`]);
  }

  viewCategory(id: number) {
    this.router.navigate([`category/${id}`]);
  }

  deleteCategory(id: number) {
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.categoryService.deleteCategory(id).subscribe(response => {
          this.categories = response;
          this.setDataSource();
        });
      }
    );
  }

  get canAddCategory() {
    return this.authorizationService.canAdd(ModuleName.CATEGORIES);
  }

  get canDeleteCategory() {
    return this.authorizationService.canDelete(ModuleName.CATEGORIES);
  }
}
