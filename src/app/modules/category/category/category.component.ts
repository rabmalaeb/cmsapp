import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
  ) {
    activatedRoute.params.forEach(param => {
      if (param.id) {
        this.getCategory(param.id);
      }
    });
  }

  ngOnInit() {
  }

  getCategory(id: number) {
    this.categoryService.getCategory(id).subscribe(response => {
      console.log('repo ', response);
    });
  }

}
