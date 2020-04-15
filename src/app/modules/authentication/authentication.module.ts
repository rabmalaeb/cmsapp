import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { LoginRoutingModule } from './authentication-routing.module';
import { AuthenticationBoxComponent } from './authentication-box/authentication-box.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthenticationBoxComponent,
    SetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [CommonModule, SharedModule, LoginRoutingModule, ComponentsModule],
  exports: [
    LoginComponent,
    AuthenticationBoxComponent,
    SetPasswordComponent,
    ResetPasswordComponent
  ]
})
export class AuthenticationModule {}
