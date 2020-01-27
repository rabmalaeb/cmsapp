import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionType, ALERT_MESSAGES, ModuleName } from 'src/app/models/general';
import { ActivatedRoute } from '@angular/router';
import { LanguageKey } from '../languagekey';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { LanguageKeyService } from '../languagekey.service';
import { Category } from '../../category/category';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-language-key-add',
  templateUrl: './languagekey-add.component.html',
  styleUrls: ['./languagekey-add.component.scss']
})
export class LanguageKeyAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private languageKeyService: LanguageKeyService,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
  ) {}

  languageKeyForm: FormGroup;
  actionType: ActionType;
  languageKey: LanguageKey;
  isLoadingLanguageKey = false;
  isLoading = false;
  categories: Category[] = [];

  ngOnInit() {
    this.route.params.forEach(param => {
      if (param.id) {
        this.getLanguageKey(param.id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        this.buildForm();
      }
    });
  }

  getLanguageKey(id: number) {
    this.isLoadingLanguageKey = true;
    this.languageKeyService.getLanguageKey(id).subscribe(response => {
      this.isLoadingLanguageKey = false;
      this.languageKey = response;
      this.buildForm();
    }, error => {
      this.isLoading = false;
      this.errorHandler.handleErrorResponse(error);
    });
  }

  buildForm() {
    let name = '';
    let description = '';
    if (this.languageKey) {
      name = this.languageKey.name;
      description = this.languageKey.description;
    }
    this.languageKeyForm = this.form.group({
      name: [name, [Validators.required]],
      description: [description, [Validators.required]],
    });
  }

  get name() {
    return this.languageKeyForm.get('name');
  }

  get description() {
    return this.languageKeyForm.get('description');
  }

  performAction(formData: any, formDirective: FormGroupDirective) {
    if (!this.languageKeyForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
    }
    if (this.languageKey) {
      this.updateLanguageKey(this.buildLanguageKeyParams());
    } else {
      this.addLanguageKey(this.buildLanguageKeyParams());
    }
  }

  buildLanguageKeyParams(): LanguageKey {
    const languageKey = new LanguageKey();
    languageKey.name = this.name.value;
    languageKey.description = this.description.value;
    return languageKey;
  }

  addLanguageKey(params) {
    this.isLoading = true;
    this.languageKeyService
      .addLanguageKey(params)
      .subscribe(response => {
        this.isLoading = false;
        this.notificationService.showSuccess('LanguageKey added successfully');
      }, error => {
        this.isLoading = false;
        this.errorHandler.handleErrorResponse(error);
      });
  }

  updateLanguageKey(params) {
    this.isLoading = true;
    const id = this.languageKey.id;
    this.languageKeyService
      .updateLanguageKey(id, params)
      .subscribe(response => {
        this.isLoading = false;
        this.notificationService.showSuccess('LanguageKey updated successfully');
      }, error => {
        this.isLoading = false;
        this.errorHandler.handleErrorResponse(error);
      });
  }

  get buttonLabel() {
    if (this.isLoading) {
      return 'Loading';
    }
    if (this.actionType === ActionType.EDIT) {
      return 'Update';
    }
    return 'Add';
  }

  get title() {
    if (this.actionType === ActionType.EDIT) {
      return 'View Language Key';
    }
    return 'Add Language Key';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditKey() {

    if (this.actionType === ActionType.ADD) {
      return true;
    }
    return this.actionType === ActionType.EDIT && this.authorizationService.canEdit(ModuleName.LANGUAGE_KEYS);
  }
}
