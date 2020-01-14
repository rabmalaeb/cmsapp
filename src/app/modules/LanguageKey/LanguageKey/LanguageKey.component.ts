import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageKeyService } from '../languageKey.service';

@Component({
  selector: 'app-language-key',
  templateUrl: './languageKey.component.html',
  styleUrls: ['./languageKey.component.scss']
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
