import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageKeysComponent } from './languageKeys/languageKeys.component';
import { LanguageKeyComponent } from './LanguageKey/LanguageKey.component';
import { LanguageKeyRoutingModule } from './LanguageKey-routing.module';
import { LanguageKeyAddComponent } from './LanguageKey-add/LanguageKey-add.component';
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
