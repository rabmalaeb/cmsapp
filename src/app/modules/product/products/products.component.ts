import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleName } from 'src/app/models/general';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  isLoading = false;
  products: Product[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'category',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe(response => {
      this.isLoading = false;
      this.products = response;
      this.setDataSource();
    });
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Product>(this.products);
    this.dataSource.paginator = this.paginator;
  }
  addProduct() {
    this.router.navigate(['products/add']);
  }

  editProduct(id: number) {
    this.router.navigate([`products/${id}/view`]);
  }

  viewProduct(id: number) {
    this.router.navigate([`product/${id}`]);
  }

  deleteProduct(id: number) {
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.productService.deleteProduct(id).subscribe(response => {
          this.products = response;
          this.setDataSource();
        });
      }
    );
  }

  get canAddProduct() {
    return this.authorizationService.canAdd(ModuleName.PRODUCTS);
  }

  get canDeleteProduct() {
    return this.authorizationService.canDelete(ModuleName.PRODUCTS);
  }

}
