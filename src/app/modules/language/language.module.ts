import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageRoutingModule } from './language-routing.module';
import { LanguageAddComponent } from './language-add/language-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { LanguageFormComponent } from './language-form/language-form.component';
import { LanguageFiltersComponent } from './language-filters/language-filters.component';

@NgModule({
  declarations: [
    LanguagesComponent,
    LanguageAddComponent,
    LanguageFormComponent,
    LanguageFiltersComponent
  ],
  imports: [CommonModule, LanguageRoutingModule, ComponentsModule, SharedModule]
})
export class LanguageModule {}
