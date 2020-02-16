import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationsComponent } from './translations/translations.component';
import { TranslationRoutingModule } from './translation-routing.module';
import { TranslationAddComponent } from './translation-add/translation-add.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslationFormComponent } from './translation-form/translation-form.component';

@NgModule({
  declarations: [
    TranslationsComponent,
    TranslationAddComponent,
    TranslationFormComponent
  ],
  imports: [
    CommonModule,
    TranslationRoutingModule,
    ComponentsModule,
    SharedModule
  ]
})
export class TranslationModule {}
