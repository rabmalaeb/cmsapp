import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { ActionType } from 'src/app/shared/models/general';
import { Banner } from '../banner';
import { Language } from '../../language/language';
import { FormService } from 'src/app/core/services/form.service';
import { BaseFormComponent } from 'src/app/shared/base/base-form/base-form.component';

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.sass'],
})
export class BannerFormComponent
  extends BaseFormComponent
  implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private formService: FormService,
    private validationMessagesService: ValidationMessagesService
  ) {
    super();
  }

  @Input() banner: Banner;
  @Input() languages: Language[];
  @Input() canEditBanner = false;
  bannerForm: FormGroup;
  bannerImage: File;
  resetImage = false;

  ngOnInit() {}

  ngOnChanges() {
    if (this.isLoadingAction || (this.actionError && this.bannerForm)) {
      return false;
    }
    if (this.banner) {
      this.buildExistingBannerForm();
    } else {
      this.buildNewBannerForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
        this.resetImage = true;
      }
    }
  }

  buildNewBannerForm() {
    this.bannerForm = this.form.group({
      name: ['', [Validators.required]],
      description: [''],
      link: [''],
      languageId: ['', [Validators.required]],
    });
  }

  buildExistingBannerForm() {
    this.bannerForm = this.form.group({
      id: [this.banner.id],
      name: [this.banner.name, [Validators.required]],
      description: [this.banner.description],
      link: [this.banner.link],
      languageId: [this.banner.languageId, [Validators.required]],
    });
  }

  get name() {
    return this.bannerForm.get('name');
  }

  get description() {
    return this.bannerForm.get('description');
  }

  get link() {
    return this.bannerForm.get('link');
  }

  get languageId() {
    return this.bannerForm.get('languageId');
  }

  get mediaId() {
    return this.bannerForm.get('mediaId');
  }

  buildBannerParams(): Banner {
    const banner = new Banner();
    banner.id = this.bannerForm.get('id')
      ? this.bannerForm.get('id').value
      : '';
    banner.name = this.name.value;
    banner.description = this.description.value;
    banner.link = this.link.value;
    banner.languageId = this.languageId.value;
    if (this.bannerImage) {
      banner.image = this.bannerImage;
    }
    return banner;
  }

  get buttonLabel() {
    if (this.isLoadingAction) {
      return 'Loading';
    }
    if (this.actionType === ActionType.EDIT) {
      return 'Update';
    }
    return 'Add';
  }

  performAction(formDirective: FormGroupDirective) {
    this.formGroupDirective = formDirective;
    if (!this.formService.isFormValid(this.bannerForm)) {
      return false;
    }
    this.submitForm.emit(this.buildBannerParams());
  }

  uploadImage(image: File) {
    this.bannerImage = image;
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get isLoadingForm() {
    return !this.banner && this.isLoading;
  }
}
