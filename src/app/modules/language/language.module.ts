import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageItemComponent } from './language-item/language-item.component';
import { LanguageComponent } from './language/language.component';
import { LanguageRoutingModule } from './language-routing.module';
import { LanguageAddComponent } from './language-add/language-add.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    LanguagesComponent,
    LanguageItemComponent,
    LanguageComponent,
    LanguageAddComponent
  ],
  imports: [CommonModule, LanguageRoutingModule, ComponentsModule, SharedModule]
})
export class LanguageModule {}
