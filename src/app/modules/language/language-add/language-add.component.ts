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
import { Language } from '../language';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { LanguageService } from '../language.service';
import { Category } from '../../category/category';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-language-add',
  templateUrl: './language-add.component.html',
  styleUrls: ['./language-add.component.scss']
})
export class LanguageAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private languageService: LanguageService,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
  ) { }

  languageForm: FormGroup;
  actionType: ActionType;
  language: Language;
  isLoadingLanguage = false;
  isLoading = false;
  categories: Category[] = [];

  ngOnInit() {
    this.route.params.forEach(param => {
      if (param.id) {
        this.getLanguage(param.id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        this.buildForm();
      }
    });
  }

  getLanguage(id: number) {
    this.isLoadingLanguage = true;
    this.languageService.getLanguage(id).subscribe(response => {
      this.isLoadingLanguage = false;
      this.language = response;
      this.buildForm();
    }, error => {
      this.isLoading = false;
      this.errorHandler.handleErrorResponse(error);
    });
  }

  buildForm() {
    let name = '';
    let code = '';
    if (this.language) {
      name = this.language.name;
      code = this.language.code;
    }
    this.languageForm = this.form.group({
      name: [name, [Validators.required]],
      code: [code, [Validators.required]],
    });
  }

  get name() {
    return this.languageForm.get('name');
  }

  get code() {
    return this.languageForm.get('code');
  }

  performAction(formData: any, formDirective: FormGroupDirective) {
    if (!this.languageForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
    }
    if (this.language) {
      this.updateLanguage(this.buildLanguageParams());
    } else {
      this.addLanguage(this.buildLanguageParams());
    }
  }

  buildLanguageParams(): Language {
    const language = new Language();
    language.name = this.name.value;
    language.code = this.code.value;
    return language;
  }

  addLanguage(params) {
    this.isLoading = true;
    this.languageService
      .addLanguage(params)
      .subscribe(response => {
        this.isLoading = false;
        this.notificationService.showSuccess('Language added successfully');
      }, error => {
        this.isLoading = false;
        this.errorHandler.handleErrorResponse(error);
      });
  }

  updateLanguage(params) {
    this.isLoading = true;
    const id = this.language.id;
    this.languageService
      .updateLanguage(id, params)
      .subscribe(response => {
        this.isLoading = false;
        this.notificationService.showSuccess('Language updated successfully');
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
      return 'View Language';
    }
    return 'Add Language';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditLanguage() {

    if (this.actionType === ActionType.ADD) {
      return true;
    }
    return this.actionType === ActionType.EDIT && this.authorizationService.canEdit(ModuleName.LANGUAGES);
  }
}
