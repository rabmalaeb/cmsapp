import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
  ) {
    activatedRoute.params.forEach(param => {
      if (param.id) {
        this.getProduct(param.id);
      }
    });
  }

  ngOnInit() {
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(response => {
      console.log('repo ', response);
    });
  }

}
