import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageKeyService } from '../languagekey.service';

@Component({
  selector: 'app-language-key',
  templateUrl: './languagekey.component.html',
  styleUrls: ['./languagekey.component.scss']
})
export class LanguageKeyComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private languagekeyService: LanguageKeyService,
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
    this.languagekeyService.getLanguageKey(id).subscribe(response => {
      console.log('repo ', response);
    });
  }

}
