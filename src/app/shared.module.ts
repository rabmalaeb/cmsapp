import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatRadioModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatMenuModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import { AlertComponent } from 'src/app/components/alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  declarations: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [],
  entryComponents: [AlertComponent]
})
export class SharedModule {}
