import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
  ) {
    activatedRoute.params.forEach(param => {
      if (param.id) {
        this.getLanguage(param.id);
      }
    });
  }

  ngOnInit() {
  }

  getLanguage(id: number) {
    this.languageService.getLanguage(id).subscribe(response => {
      console.log('repo ', response);
    });
  }

}
