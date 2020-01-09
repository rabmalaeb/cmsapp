import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageKeyService } from '../LanguageKey.service';

@Component({
  selector: 'app-language-key',
  templateUrl: './LanguageKey.component.html',
  styleUrls: ['./LanguageKey.component.scss']
})
export class LanguageKeyComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private languageKeyService: LanguageKeyService,
  ) {
    activatedRoute.params.forEach(param => {
      if (param.id) {
        this.getLanguageKey(param.id);
      }
    });
  }

  ngOnInit() {
  }

  getLanguageKey(id: number) {
    this.languageKeyService.getLanguageKey(id).subscribe(response => {
      console.log('repo ', response);
    });
  }

}
