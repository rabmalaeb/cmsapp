import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageRoutingModule } from './language-routing.module';
import { LanguageAddComponent } from './language-add/language-add.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { LanguageFormComponent } from './language-form/language-form.component';

@NgModule({
  declarations: [
    LanguagesComponent,
    LanguageAddComponent,
    LanguageFormComponent
  ],
  imports: [CommonModule, LanguageRoutingModule, ComponentsModule, SharedModule]
})
export class LanguageModule {}
