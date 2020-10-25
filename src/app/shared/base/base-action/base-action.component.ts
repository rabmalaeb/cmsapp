import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionType } from '../../models/general';

@Component({
  selector: 'app-base-action',
  templateUrl: './base-action.component.html',
  styleUrls: ['./base-action.component.scss'],
})
export class BaseActionComponent implements OnInit {
  actionType: ActionType;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<string[]>;
  actionErrors$: Observable<string[]>;
  constructor() {}

  ngOnInit(): void {}
}
