import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translationService: TranslationService,
  ) {
    activatedRoute.params.forEach(param => {
      if (param.id) {
        this.getTranslation(param.id);
      }
    });
  }

  ngOnInit() {
  }

  getTranslation(id: number) {
    this.translationService.getTranslation(id).subscribe(response => {
      console.log('repo ', response);
    });
  }

}
