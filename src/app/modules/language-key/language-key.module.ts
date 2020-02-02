import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageKeysComponent } from './language-keys/language-keys.component';
import { LanguageKeyRoutingModule } from './language-key-routing.module';
import { LanguageKeyAddComponent } from './language-key-add/language-key-add.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    LanguageKeysComponent,
    LanguageKeyAddComponent
  ],
  imports: [
    CommonModule,
    LanguageKeyRoutingModule,
    ComponentsModule,
    SharedModule
  ]
})
export class LanguageKeyModule {}
