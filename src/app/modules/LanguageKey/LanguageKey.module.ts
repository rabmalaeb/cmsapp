import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageKeysComponent } from './languageKeys/languageKeys.component';
import { LanguageKeyComponent } from './languageKey/languageKey.component';
import { LanguageKeyRoutingModule } from './languageKey-routing.module';
import { LanguageKeyAddComponent } from './languageKey-add/languageKey-add.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [LanguageKeysComponent, LanguageKeyComponent, LanguageKeyAddComponent],
  imports: [
    CommonModule,
    LanguageKeyRoutingModule,
    ComponentsModule,
    SharedModule
  ]
})
export class LanguageKeyModule { }
