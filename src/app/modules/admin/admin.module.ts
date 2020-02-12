import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsComponent } from './admins/admins.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [
    AdminsComponent,
    AdminAddComponent
  ],
  imports: [CommonModule, AdminRoutingModule, ComponentsModule, SharedModule]
})
export class AdminModule {}
