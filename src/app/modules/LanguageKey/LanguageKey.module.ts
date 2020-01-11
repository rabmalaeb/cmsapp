import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageKeysComponent } from './languagekeys/languagekeys.component';
import { LanguageKeyComponent } from './languagekey/languagekey.component';
import { LanguageKeyRoutingModule } from './languagekey-routing.module';
import { LanguageKeyAddComponent } from './languagekey-add/languagekey-add.component';
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
