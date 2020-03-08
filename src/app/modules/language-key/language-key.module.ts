import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageKeysComponent } from './language-keys/language-keys.component';
import { LanguageKeyRoutingModule } from './language-key-routing.module';
import { LanguageKeyAddComponent } from './language-key-add/language-key-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { LanguageKeyFormComponent } from './language-key-form/language-key-form.component';
import { LanguageKeyFiltersComponent } from './language-key-filters/language-key-filters.component';

@NgModule({
  declarations: [
    LanguageKeysComponent,
    LanguageKeyAddComponent,
    LanguageKeyFormComponent,
    LanguageKeyFiltersComponent
  ],
  imports: [
    CommonModule,
    LanguageKeyRoutingModule,
    ComponentsModule,
    SharedModule
  ]
})
export class LanguageKeyModule {}
