import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionType, ModuleName } from 'src/app/models/general';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Store, ActionsSubject } from '@ngrx/store';
import {
  RootStoreState,
  UserStoreActions,
  UserStoreSelectors
} from 'src/app/root-store';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActionTypes } from '../store/actions';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute
  ) {}

  actionType: ActionType;
  user$: Observable<User>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<string[]>;
  actionErrors$: Observable<string[]>;

  ngOnInit() {
    this.initializeStoreVariables();
    this.route.params.forEach(param => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getUser(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      UserStoreSelectors.selectUserActionError
    );

    this.isLoadingAction$ = this.store$.select(
      UserStoreSelectors.selectIsLoadingAction
    );

    this.isLoading$ = this.store$.select(
      UserStoreSelectors.selectIsLoadingItem
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_USER_SUCCESS ||
            action.type === ActionTypes.ADD_USER_SUCCESS
        )
      )
      .subscribe(() => {
        let message = 'User Updated Successfully';
        if (this.actionType === ActionType.ADD) {
          message = 'User Added Successfully';
        }
        this.notificationService.showSuccess(message);
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_USER_FAILURE ||
            action.type === ActionTypes.ADD_USER_FAILURE
        )
      )
      .subscribe(errorResponse => {
        this.notificationService.showError(errorResponse.payload.error.message);
      });
  }

  getUser(id: number) {
    this.store$.dispatch(new UserStoreActions.GetUserRequestAction(id));
    this.user$ = this.store$.select(UserStoreSelectors.selectUserById(id));
    this.loadingErrors$ = this.store$.select(
      UserStoreSelectors.selectUserLoadingError
    );
  }

  performAction(user: User) {
    if (this.actionType === ActionType.EDIT) {
      this.updateUser(user);
    } else {
      this.addUser(user);
    }
  }

  addUser(params: User) {
    this.store$.dispatch(new UserStoreActions.AddUserRequestAction(params));
  }

  updateUser(params: User) {
    const id = params.id;
    this.store$.dispatch(
      new UserStoreActions.UpdateUserRequestAction(id, params)
    );
  }

  get title() {
    if (this.actionType === ActionType.EDIT) {
      return 'View User';
    }
    return 'Add User';
  }

  get canEditUser$() {
    if (this.actionType === ActionType.ADD) {
      return of(true);
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.USERS)
    );
  }
}
