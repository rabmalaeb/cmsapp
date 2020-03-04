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
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionType, ALERT_MESSAGES } from 'src/app/shared/models/general';
import { Banner } from '../banner';
import { Media } from '../../media/media';
import { MediaService } from '../../media/media.service';
import { Language } from '../../language/language';

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.sass']
})
export class BannerFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private notificationService: NotificationService,
    private mediaService: MediaService,
    private validationMessagesService: ValidationMessagesService
  ) {}

  bannerForm: FormGroup;
  bannerImage: File;
  bannerMedia: Media;
  imageUrl: any;
  @Input() banner: Banner;
  @Input() languages: Language[];
  @Input() actionType: ActionType;
  @Input() isLoadingAction: boolean;
  @Input() canEditBanner = false;
  @Input() isLoading: boolean;
  @Output() submitForm = new EventEmitter<Banner>();
  formGroupDirective: FormGroupDirective;

  ngOnInit() {}

  ngOnChanges() {
    if (this.isLoadingAction) {
      return false;
    }
    if (this.banner) {
      this.buildExistingBannerForm();
    } else {
      this.buildNewBannerForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
      }
    }
  }

  buildNewBannerForm() {
    this.bannerForm = this.form.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      link: ['', [Validators.required]],
      mediaId: [0, [Validators.required]],
      languageId: [0, [Validators.required]]
    });
  }

  buildExistingBannerForm() {
    this.bannerForm = this.form.group({
      name: [this.banner.name, [Validators.required]],
      description: [this.banner.description, [Validators.required]],
      link: [this.banner.link, [Validators.required]],
      mediaId: [this.banner.mediaId, [Validators.required]],
      languageId: [this.banner.languageId, [Validators.required]]
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
    banner.mediaId = this.bannerMedia.id;
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
    if (!this.bannerForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
    }
    if (this.bannerImage) {
      const data = new FormData();
      data.append('image', this.bannerImage, this.bannerImage.name);
      this.mediaService.addMedia(data).subscribe(response => {
        this.bannerMedia = response;
        this.submitForm.emit(this.buildBannerParams());
      });
    }
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
